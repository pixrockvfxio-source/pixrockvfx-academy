-- PixRock Academy — registration storage
--
-- Run once, in hPanel → Databases → phpMyAdmin → your database → SQL tab.
-- Paste this whole file and press Go.
--
-- If you already created the previous `enquiries` table, do NOT run this.
-- Run migrate-2-registration.sql instead, which alters it in place and keeps
-- anything already collected.

CREATE TABLE IF NOT EXISTS `enquiries` (
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

  -- Set when the internal notification goes out, and when the registrant's
  -- automated confirmation goes out. NULL means that email did not send —
  -- which is visible and fixable rather than silent.
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
