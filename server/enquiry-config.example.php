<?php
/**
 * PixRock Academy — enquiry endpoint configuration TEMPLATE.
 *
 * SETUP
 *   1. Copy this file to `enquiry-config.php`.
 *   2. Fill in the real values.
 *   3. Upload `enquiry-config.php` ONE LEVEL ABOVE public_html if you can —
 *      e.g. /home/u722218362/enquiry-config.php. The endpoint looks there
 *      first. Nothing above public_html is reachable over the web, so the
 *      credentials cannot be served even if PHP is misconfigured.
 *      If your host will not allow that, put it next to enquiry.php; the
 *      supplied .htaccess blocks direct access to it as a second line of
 *      defence.
 *
 * NEVER commit the filled-in enquiry-config.php to git. It is listed in
 * .gitignore for exactly this reason.
 */

return [
    // --- Database (hPanel → Databases → MySQL Databases) --------------------
    // Hostinger prefixes both the database and the user, e.g. u722218362_pixrock.
    'db_host' => 'localhost',
    'db_name' => 'REPLACE_WITH_DATABASE_NAME',
    'db_user' => 'REPLACE_WITH_DATABASE_USER',
    'db_pass' => 'REPLACE_WITH_DATABASE_PASSWORD',

    // --- Notification email -------------------------------------------------
    // Where each enquiry is sent. Multiple addresses allowed.
    'mail_to' => ['admissions@pixrockvfxacademy.in'],

    // The From address MUST be on your own domain. Sending "from" the
    // enquirer's address fails SPF/DMARC and lands in spam or is rejected.
    // Create this mailbox in hPanel → Emails first.
    'mail_from'      => 'website@pixrockvfxacademy.in',
    'mail_from_name' => 'PixRock Academy Website',

    // --- Abuse protection ---------------------------------------------------
    // Maximum submissions accepted from one IP within the window.
    'rate_limit_max'     => 5,
    'rate_limit_minutes' => 10,

    // Only accept submissions sent from these hosts. Leave empty to disable.
    'allowed_origins' => [
        'https://pixrockvfxacademy.in',
        'https://www.pixrockvfxacademy.in',
    ],
];
