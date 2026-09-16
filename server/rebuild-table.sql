-- PixRock Academy — put the `enquiries` table into the registration shape.
--
-- Replaces the earlier migration, which relied on information_schema. Hostinger
-- denies that to your database user, so no script can inspect the table before
-- altering it. This one does not need to: it sets the old table aside and
-- builds a clean one.
--
-- NOTHING IS DELETED. Whatever is in the table now is renamed to
-- `enquiries_old` and stays there, readable in phpMyAdmin, until you choose to
-- drop it. Only plain SQL is used, so it works on MySQL and MariaDB alike.
--
-- Paste the whole file into phpMyAdmin → SQL → Go.

-- --------------------------------------------------------------------------
-- 1. Set the existing table aside, keeping every row.
--    If you have run this before, drop `enquiries_old` first or rename it.
-- --------------------------------------------------------------------------
RENAME TABLE `enquiries` TO `enquiries_old`;

-- --------------------------------------------------------------------------
-- 2. Build the table the registration form expects.
-- --------------------------------------------------------------------------
CREATE TABLE `enquiries` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submitted_at`  DATETIME     NOT NULL,

  -- The only two details asked for.
  `email`         VARCHAR(190) NOT NULL,
  `phone`         VARCHAR(32)  NOT NULL,

  -- Context captured from the page, not asked of the visitor.
  `course`        VARCHAR(64)  NULL,
  `course_label`  VARCHAR(120) NULL,
  `source_path`   VARCHAR(190) NULL,

  -- Kept for abuse prevention. Disclosed in the privacy policy.
  `ip_address`    VARCHAR(45)  NULL,
  `user_agent`    VARCHAR(255) NULL,

  -- Set when each email goes out. NULL means that one did not send, which is
  -- visible and fixable rather than silent.
  `notified_at`   DATETIME     NULL,
  `confirmed_at`  DATETIME     NULL,

  -- Follow-up workflow: register → call → WhatsApp.
  `status`        ENUM('new','called','whatsapp','enrolled','closed') NOT NULL DEFAULT 'new',
  `notes`         TEXT         NULL,

  PRIMARY KEY (`id`),
  KEY `idx_submitted_at` (`submitted_at`),
  KEY `idx_status` (`status`),
  KEY `idx_course` (`course`),
  KEY `idx_ip_time` (`ip_address`, `submitted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- 3. Carry across anything already collected.
--    Safe if the old table was empty — it simply copies nothing.
--    Safe if the old table has no `course` column — remove it from both lists.
-- --------------------------------------------------------------------------
INSERT INTO `enquiries` (`submitted_at`, `email`, `phone`, `course`, `course_label`, `notified_at`)
SELECT `submitted_at`, `email`, `phone`, `course`, `course_label`, `notified_at`
FROM `enquiries_old`;

-- --------------------------------------------------------------------------
-- 4. Confirm the result.
-- --------------------------------------------------------------------------
SELECT COUNT(*) AS `rows_carried_across` FROM `enquiries`;
