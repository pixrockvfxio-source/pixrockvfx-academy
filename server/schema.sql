-- PixRock Academy — enquiry storage
--
-- Run once, in hPanel → Databases → phpMyAdmin → your database → SQL tab.
-- Paste this whole file and press Go.

CREATE TABLE IF NOT EXISTS `enquiries` (
  `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submitted_at`      DATETIME     NOT NULL,

  `name`              VARCHAR(120) NOT NULL,
  `phone`             VARCHAR(32)  NOT NULL,
  `email`             VARCHAR(190) NOT NULL,
  `course`            VARCHAR(64)  NOT NULL,
  `course_label`      VARCHAR(120) NULL,
  `qualification`     VARCHAR(120) NULL,
  `city`              VARCHAR(80)  NULL,
  `preferred_contact` VARCHAR(16)  NOT NULL DEFAULT 'phone',
  `message`           TEXT         NULL,

  -- Kept for abuse prevention and to answer "did this actually send?".
  -- Disclosed in the privacy policy.
  `ip_address`        VARCHAR(45)  NULL,
  `user_agent`        VARCHAR(255) NULL,

  -- Set once the notification email has gone out, so a failed send is visible
  -- rather than silent. NULL means the enquiry is stored but not yet emailed.
  `notified_at`       DATETIME     NULL,

  -- Simple workflow tracking for the counselling team.
  `status`            ENUM('new','contacted','enrolled','closed') NOT NULL DEFAULT 'new',
  `notes`             TEXT         NULL,

  PRIMARY KEY (`id`),
  KEY `idx_submitted_at` (`submitted_at`),
  KEY `idx_status` (`status`),
  KEY `idx_course` (`course`),
  KEY `idx_ip_time` (`ip_address`, `submitted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
