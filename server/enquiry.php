<?php
/**
 * PixRock Academy — enquiry endpoint.
 *
 * Receives the website's enquiry form, stores it in MySQL, then emails a
 * notification. Upload alongside index.html in public_html.
 *
 * Design notes
 * ------------
 * The database is the record; the email is only a notification. The insert
 * happens first and a failed send never fails the request, so a mail outage
 * can never lose an enquiry — it just leaves `notified_at` NULL, which is
 * queryable. Losing a prospective student to an SMTP hiccup is the one
 * outcome worth engineering against.
 *
 * Credentials live in enquiry-config.php, which is looked for above the web
 * root first and is never committed to the repository.
 */

declare(strict_types=1);

// Never leak a stack trace containing credentials to a browser.
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Sends a JSON response and stops. */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Writes to the PHP error log without exposing anything to the caller. */
function log_problem(string $context, Throwable $e): void
{
    error_log(sprintf('[enquiry] %s: %s', $context, $e->getMessage()));
}

// -----------------------------------------------------------------------------
// 1. Configuration
// -----------------------------------------------------------------------------
$configPaths = [
    dirname(__DIR__) . '/enquiry-config.php', // preferred: above public_html
    __DIR__ . '/enquiry-config.php',          // fallback: alongside this file
];

$config = null;
foreach ($configPaths as $path) {
    if (is_readable($path)) {
        $config = require $path;
        break;
    }
}

if (!is_array($config)) {
    error_log('[enquiry] enquiry-config.php not found in: ' . implode(', ', $configPaths));
    respond(500, ['ok' => false, 'error' => 'The enquiry service is not configured yet.']);
}

// -----------------------------------------------------------------------------
// 2. Request guards
// -----------------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    header('Allow: POST');
    respond(204, []);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Same-origin check.
//
// Compare HOSTS, not full origin strings. Matching on the exact string breaks
// the form for anyone arriving over http:// before the certificate is live, or
// on www when only the apex is listed — a 403 that looks exactly like a broken
// site. The request's own Host is always accepted (that is what same-origin
// means), with `allowed_origins` as an optional extra for other front-ends.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    /** Reduces an origin or host to a bare, comparable hostname. */
    $hostOf = static function (string $value): string {
        $host = parse_url($value, PHP_URL_HOST) ?: $value;
        $host = strtolower(preg_replace('/:\d+$/', '', $host) ?? '');
        return preg_replace('/^www\./', '', $host) ?? $host;
    };

    $allowedHosts = array_map($hostOf, (array) ($config['allowed_origins'] ?? []));
    $allowedHosts[] = $hostOf((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $allowedHosts = array_values(array_filter(array_unique($allowedHosts)));

    if ($allowedHosts && !in_array($hostOf($origin), $allowedHosts, true)) {
        respond(403, ['ok' => false, 'error' => 'Request rejected.']);
    }
}

// -----------------------------------------------------------------------------
// 3. Input
// -----------------------------------------------------------------------------
$raw = file_get_contents('php://input') ?: '';

if (strlen($raw) > 20000) {
    respond(413, ['ok' => false, 'error' => 'Submission too large.']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST; // tolerate a normal form post
}

/** Trims, strips control characters and caps length. */
function field(array $data, string $key, int $max): string
{
    $value = isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

// Honeypot: a real person never fills a field they cannot see. Accept the
// request so the bot believes it worked, but store nothing.
if (field($data, 'website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$enquiry = [
    'email'        => field($data, 'email', 190),
    'phone'        => field($data, 'phone', 32),
    // Context captured from the page, never asked of the visitor.
    'course'       => field($data, 'course', 64),
    'course_label' => field($data, 'courseLabel', 120),
    'source_path'  => field($data, 'sourcePath', 190),
];

// -----------------------------------------------------------------------------
// 4. Validation — mirrors the client, because the client can be bypassed
// -----------------------------------------------------------------------------
$errors = [];

if (!filter_var($enquiry['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'That email address does not look right.';
}

$digits = preg_replace('/\D/', '', $enquiry['phone']) ?? '';
if (strlen($digits) < 8 || strlen($digits) > 15) {
    $errors['phone'] = 'Enter a valid contact number including country or area code.';
}

if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.', 'fields' => $errors]);
}

// -----------------------------------------------------------------------------
// 5. Database
// -----------------------------------------------------------------------------
try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']),
        $config['db_user'],
        $config['db_pass'],
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (Throwable $e) {
    log_problem('database connection failed', $e);
    respond(500, ['ok' => false, 'error' => 'We could not save your enquiry just now. Please try again shortly.']);
}

$ip = substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
$userAgent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);

// Rate limit: block a flood from one address without troubling a real visitor.
try {
    $max = (int) ($config['rate_limit_max'] ?? 5);
    $minutes = (int) ($config['rate_limit_minutes'] ?? 10);

    $check = $pdo->prepare(
        'SELECT COUNT(*) FROM enquiries
         WHERE ip_address = :ip AND submitted_at > (NOW() - INTERVAL :mins MINUTE)'
    );
    $check->bindValue(':ip', $ip);
    $check->bindValue(':mins', $minutes, PDO::PARAM_INT);
    $check->execute();

    if ((int) $check->fetchColumn() >= $max) {
        respond(429, [
            'ok'    => false,
            'error' => 'You have sent several enquiries already. Please give us a little time to reply.',
        ]);
    }
} catch (Throwable $e) {
    // A rate-limit failure must not block a genuine enquiry.
    log_problem('rate limit check failed', $e);
}

try {
    $insert = $pdo->prepare(
        'INSERT INTO enquiries
            (submitted_at, email, phone, course, course_label, source_path, ip_address, user_agent)
         VALUES
            (NOW(), :email, :phone, :course, :course_label, :source_path, :ip, :ua)'
    );
    $insert->execute([
        ':email'        => $enquiry['email'],
        ':phone'        => $enquiry['phone'],
        ':course'       => $enquiry['course'] ?: null,
        ':course_label' => $enquiry['course_label'] ?: null,
        ':source_path'  => $enquiry['source_path'] ?: null,
        ':ip'           => $ip ?: null,
        ':ua'           => $userAgent ?: null,
    ]);
    $registrationId = (int) $pdo->lastInsertId();
} catch (Throwable $e) {
    log_problem('insert failed', $e);
    respond(500, ['ok' => false, 'error' => 'We could not save your enquiry just now. Please try again shortly.']);
}

// -----------------------------------------------------------------------------
// 6. Email
//
// Two messages go out: an internal notification so the team can start calling,
// and an automated confirmation to the registrant.
//
// The registration is already stored, so neither send can fail the request. A
// failure is logged and leaves notified_at / confirmed_at NULL, which is
// queryable — a silent mail outage is visible instead of invisible.
//
// From: must be on our own domain or SPF and DMARC will reject the message.
// Nothing user-supplied ever reaches a header: the address is validated by
// FILTER_VALIDATE_EMAIL and control characters are stripped on input, so
// header injection has no surface here.
// -----------------------------------------------------------------------------
$fromName = str_replace(["\r", "\n"], '', (string) ($config['mail_from_name'] ?? 'PixRock Academy'));
$fromAddr = (string) ($config['mail_from'] ?? '');
$academy  = (string) ($config['academy_name'] ?? 'PixRock Academy');
$courseLabel = $enquiry['course_label'] !== '' ? $enquiry['course_label'] : null;

/** Sends a plain-text UTF-8 message. Returns false rather than throwing. */
function send_mail(string $to, string $subject, string $body, array $extraHeaders, string $fromAddr): bool
{
    if ($to === '' || $fromAddr === '') {
        return false;
    }

    $headers = array_merge([
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PixRock Academy Website',
    ], $extraHeaders);

    return @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $fromAddr);
}

// --- 6a. Internal notification ------------------------------------------------
$notified = false;

try {
    $to = implode(', ', (array) ($config['mail_to'] ?? []));

    $subject = sprintf('New registration #%d — %s', $registrationId, $enquiry['phone']);

    $body = "A new registration came in from the website.\n\n"
        . str_repeat('-', 52) . "\n"
        . 'Registration ID : ' . $registrationId . "\n"
        . 'Received        : ' . date('d M Y, H:i') . "\n"
        . str_repeat('-', 52) . "\n"
        . 'Email           : ' . $enquiry['email'] . "\n"
        . 'Contact number  : ' . $enquiry['phone'] . "\n"
        . 'Course interest : ' . ($courseLabel ?? 'Not specified — registered from ' . ($enquiry['source_path'] ?: 'the site')) . "\n"
        . str_repeat('-', 52) . "\n\n"
        . "Next step: call this number to verify interest, then move the\n"
        . "conversation to WhatsApp.\n\n"
        . "Reply to this email to reach the registrant directly.\n";

    $notified = send_mail($to, $subject, $body, [
        'From: ' . sprintf('%s <%s>', $fromName, $fromAddr),
        'Reply-To: ' . $enquiry['email'],
    ], $fromAddr);

    if ($notified) {
        $pdo->prepare('UPDATE enquiries SET notified_at = NOW() WHERE id = :id')->execute([':id' => $registrationId]);
    } else {
        error_log('[enquiry] internal notification failed for #' . $registrationId);
    }
} catch (Throwable $e) {
    log_problem('notification failed for #' . $registrationId, $e);
}

// --- 6b. Automated confirmation to the registrant -----------------------------
// Deliberately says nothing about fees, outcomes or placement: the brochure
// forbids implying a record the academy does not have, and fees are a
// counselling conversation.
$confirmed = false;

try {
    $subject = $courseLabel
        ? sprintf('Registration confirmed: %s', $courseLabel)
        : 'Your registration with ' . $academy;

    $reply = (array) ($config['mail_to'] ?? []);
    $replyTo = $reply[0] ?? $fromAddr;

    $body = "Thank you for registering with " . $academy . ".\n\n"
        . ($courseLabel ? 'Course of interest: ' . $courseLabel . "\n\n" : '')
        . "What happens next\n"
        . str_repeat('-', 52) . "\n"
        . "1. A counsellor will call you on " . $enquiry['phone'] . " within one\n"
        . "   working day to answer your questions.\n"
        . "2. After that call we will continue on WhatsApp, so you can reach us\n"
        . "   easily whenever something comes up.\n\n"
        . "If the number above is wrong, or a different time suits you better,\n"
        . "just reply to this email and let us know.\n\n"
        . $academy . "\n";

    $confirmed = send_mail($enquiry['email'], $subject, $body, [
        'From: ' . sprintf('%s <%s>', $fromName, $fromAddr),
        'Reply-To: ' . $replyTo,
        'Auto-Submitted: auto-replied',
    ], $fromAddr);

    if ($confirmed) {
        $pdo->prepare('UPDATE enquiries SET confirmed_at = NOW() WHERE id = :id')->execute([':id' => $registrationId]);
    } else {
        error_log('[enquiry] confirmation email failed for #' . $registrationId);
    }
} catch (Throwable $e) {
    log_problem('confirmation failed for #' . $registrationId, $e);
}

// The registration is stored either way, so the visitor is told it succeeded.
respond(200, ['ok' => true, 'id' => $registrationId, 'notified' => $notified, 'confirmed' => $confirmed]);
