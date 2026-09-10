# Enquiry form — server setup

Four steps. Roughly fifteen minutes in hPanel.

Every enquiry is written to a MySQL table and a notification email is sent.
The database is the record; the email is only the alert. If email delivery
fails the enquiry is still saved, and `notified_at` stays `NULL` so you can see
it happened — an enquiry is never lost to a mail problem.

---

## 1. Create the database

hPanel → **Databases → MySQL Databases**

Create a database and a user, and note the three values Hostinger gives you.
They are prefixed with your account number, e.g. `u722218362_pixrock`.

| You need | Example |
| --- | --- |
| Database name | `u722218362_pixrock` |
| Database user | `u722218362_pixrock` |
| Password | the one you set |

## 2. Create the table

hPanel → **Databases → phpMyAdmin** → select your database → **SQL** tab.

Paste the whole of `schema.sql` and press **Go**. You should see the
`enquiries` table appear in the left-hand list.

## 3. Upload the two PHP files

| File | Where it goes |
| --- | --- |
| `enquiry.php` | `domains/pixrockvfxacademy.in/public_html/` — next to `index.html` |
| `enquiry-config.php` | **One level above** `public_html`, i.e. `domains/pixrockvfxacademy.in/` |

Open `enquiry-config.php` in File Manager's editor first and fill in the
database name, user and password from step 1, plus the email address that
should receive notifications.

**Why above `public_html`:** nothing above the web root can be requested by a
browser, so the database password cannot be served even if PHP is ever
misconfigured. If your host will not allow it there, put it next to
`enquiry.php` — the supplied `.htaccess` blocks direct access to it as a
second line of defence, which is good but not as good.

### The notification sender address

hPanel → **Emails** → create a mailbox on your own domain, e.g.
`website@pixrockvfxacademy.in`, and use it as `mail_from`.

This matters. Email sent "from" the enquirer's own address fails SPF and DMARC
checks and will be filtered as spam or rejected outright. The endpoint sets
`From:` to your own domain and `Reply-To:` to the enquirer, so hitting reply in
your inbox still replies to the student.

## 4. Replace index.html

Upload the new `pixrock-website.html` to `public_html`, rename it to
`index.html`, replacing the existing one. This build posts to `/enquiry.php`;
the previous one discarded submissions.

---

## Checking it works

Submit a test enquiry through the live form, then in phpMyAdmin run:

```sql
SELECT id, submitted_at, name, email, course_label, notified_at
FROM enquiries
ORDER BY id DESC
LIMIT 10;
```

- **A row appears, `notified_at` has a time** — everything works.
- **A row appears, `notified_at` is NULL** — storage is fine, email is not.
  Check the mailbox in `mail_from` exists, and look in hPanel's error log.
- **No row appears** — check the browser's Network tab. `500` means the
  database credentials are wrong or `enquiry-config.php` is not where the
  script looks; the real reason is in hPanel → **Advanced → PHP Error Log**.

## Reading enquiries day to day

phpMyAdmin → `enquiries` → **Browse**. The `status` column
(`new` / `contacted` / `enrolled` / `closed`) and the `notes` column are there
for the counselling team to track follow-ups.

To export for a spreadsheet: select the table → **Export** → CSV.

## What is stored

Name, phone, email, course, qualification, city, preferred contact method,
message, timestamp — plus IP address and browser user-agent, kept for abuse
prevention. All of that is disclosed on the site's Privacy Policy page. If you
would rather not keep IP addresses, drop those two columns and remove them from
the `INSERT` in `enquiry.php`.

## Built-in protections

- **Prepared statements** — SQL injection is neutralised (tested).
- **Honeypot** — bots that fill the hidden field get a success response and
  nothing is stored.
- **Rate limiting** — 5 submissions per IP per 10 minutes by default,
  configurable.
- **Server-side validation** — the browser can be bypassed, so every field is
  re-validated here; field-level errors are returned to the form.
- **Same-origin check** — submissions from other websites are refused, while
  `www`, non-`www`, `http` and `https` all keep working.
- **No credentials in the browser** — the endpoint is same-origin and the
  password never leaves the server.
