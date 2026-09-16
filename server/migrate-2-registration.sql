-- PixRock Academy — migrate an EXISTING `enquiries` table to the two-field
-- registration form.
--
-- Only run this if you already created the table from the first schema.sql.
-- For a fresh install, run schema.sql instead.
--
-- Nothing is dropped. The old columns are kept and made optional, so any
-- enquiries already collected stay exactly as they are.

ALTER TABLE `enquiries`
  MODIFY `name`   VARCHAR(120) NULL,
  MODIFY `course` VARCHAR(64)  NULL;

ALTER TABLE `enquiries`
  ADD COLUMN `source_path`  VARCHAR(190) NULL AFTER `course_label`,
  ADD COLUMN `confirmed_at` DATETIME     NULL AFTER `notified_at`;

-- Widen the workflow states to match register → call → WhatsApp.
ALTER TABLE `enquiries`
  MODIFY `status` ENUM('new','called','whatsapp','contacted','enrolled','closed')
  NOT NULL DEFAULT 'new';
