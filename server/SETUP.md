# Registration form — server setup

Four steps. Roughly fifteen minutes in hPanel.

Every registration is written to a MySQL table, then two emails go out: an
internal notification so the team can start calling, and an automated
confirmation to the registrant.

The database is the record; email is only the alert. If either send fails the
registration is still saved, and `notified_at` / `confirmed_at` stay `NULL` so
you can see which one failed. A registration is never lost to a mail problem.

The funnel: register (email + contact number) → phone call → WhatsApp.

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

**Fresh install:** paste the whole of `schema.sql` and press **Go**. The
`enquiries` table should appear in the left-hand list.

**If you already created the table from the earlier schema:** run
`migrate-2-registration.sql` instead. It alters the table in place, keeps every
row already collected, and only makes the old columns optional — nothing is
dropped.

## 3. Upload the two PHP files

| File | Where it goes |
| --- | --- |
| `enquiry.php` | `domains/pixrockvfxacademy.in/public_html/` — next to `index.html` |
| `enquiry-config.php` | **One level above** `public_html`, i.e. `domains/pixrockvfxacademy.in/` |

Open `enquiry-config.php` in File Manager's editor first and fill in:

- `db_name`, `db_user`, `db_pass` — from step 1
- `mail_to` — where internal notifications should arrive
- `mail_from` — the mailbox on your own domain (see below)
- `academy_name` — signed at the end of the confirmation email

**Why above `public_html`:** nothing above the web root can be requested by a
browser, so the database password cannot be served even if PHP is ever
misconfigured. If your host will not allow it there, put it next to
`enquiry.php` — the supplied `.htaccess` blocks direct access to it as a
second line of defence, which is good but not as good.

### The notification sender address

hPanel → **Emails** → create a mailbox on your own domain, e.g.
`website@pixrockvfxacademy.in`, and use it as `mail_from`.

This matters, and it matters twice now that a confirmation goes to the
registrant. Email sent "from" someone else's address fails SPF and DMARC and is
filtered as spam or rejected outright. Both messages are sent `From:` your own
domain, with `Reply-To:` set so replies land in the right place: the internal
notification replies to the registrant, the confirmation replies to you.

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

- **Row present, both timestamps set** — everything works. Check the
  registrant's inbox for the confirmation too.
- **Row present, one or both NULL** — storage is fine, that email is not.
  Check the `mail_from` mailbox exists, then hPanel's PHP error log.
- **No row appears** — check the browser's Network tab. `500` means the
  database credentials are wrong or `enquiry-config.php` is not where the
  script looks; the real reason is in hPanel → **Advanced → PHP Error Log**.

## Reading enquiries day to day

phpMyAdmin → `enquiries` → **Browse**. The `status` column tracks the funnel
(`new` → `called` → `whatsapp` → `enrolled` / `closed`) and `notes` is free
text for the counselling team.

To export for a spreadsheet: select the table → **Export** → CSV.

## What is stored

Email address, contact number and timestamp — plus the course page the person
registered from (captured automatically, never asked for), and IP address and
browser user-agent kept for abuse prevention. All of that is disclosed on the site's Privacy Policy page. If you
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
