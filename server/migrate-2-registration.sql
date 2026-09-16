-- PixRock Academy — bring the `enquiries` table to the registration shape.
--
-- SAFE TO RUN MORE THAN ONCE, and safe to run whatever state the table is in:
-- original schema, partially migrated, or already done. Each step checks
-- information_schema first and skips anything already in place.
--
-- Nothing is dropped. Columns from the earlier form are kept and only made
-- optional, so any rows already collected stay exactly as they are.
--
-- Paste the whole file into phpMyAdmin → SQL → Go. It uses prepared
-- statements rather than a stored procedure, so there is no DELIMITER to
-- change and phpMyAdmin's importer handles it directly.

-- --------------------------------------------------------------------------
-- 1. Add `source_path` if it is missing
-- --------------------------------------------------------------------------
SET @add_source_path := (
  SELECT IF(COUNT(*) = 0,
    'ALTER TABLE `enquiries` ADD COLUMN `source_path` VARCHAR(190) NULL',
    'DO 0')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries' AND COLUMN_NAME = 'source_path'
);
PREPARE stmt FROM @add_source_path; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- --------------------------------------------------------------------------
-- 2. Add `confirmed_at` if it is missing
-- --------------------------------------------------------------------------
SET @add_confirmed_at := (
  SELECT IF(COUNT(*) = 0,
    'ALTER TABLE `enquiries` ADD COLUMN `confirmed_at` DATETIME NULL',
    'DO 0')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries' AND COLUMN_NAME = 'confirmed_at'
);
PREPARE stmt FROM @add_confirmed_at; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- --------------------------------------------------------------------------
-- 3. Make `name` optional — only if that column still exists.
--    A table created from the new schema.sql has no `name` column at all.
-- --------------------------------------------------------------------------
SET @relax_name := (
  SELECT IF(COUNT(*) = 1,
    'ALTER TABLE `enquiries` MODIFY `name` VARCHAR(120) NULL',
    'DO 0')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries' AND COLUMN_NAME = 'name'
);
PREPARE stmt FROM @relax_name; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- --------------------------------------------------------------------------
-- 4. Make `course` optional — registrations from the Contact page have none
-- --------------------------------------------------------------------------
SET @relax_course := (
  SELECT IF(COUNT(*) = 1,
    'ALTER TABLE `enquiries` MODIFY `course` VARCHAR(64) NULL',
    'DO 0')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries' AND COLUMN_NAME = 'course'
);
PREPARE stmt FROM @relax_course; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- --------------------------------------------------------------------------
-- 5. Any other leftover NOT NULL columns from the old form would block an
--    insert, since the new form does not collect them. Relax the ones that
--    exist. (MODIFY is safe to repeat.)
-- --------------------------------------------------------------------------
SET @relax_pref := (
  SELECT IF(COUNT(*) = 1,
    'ALTER TABLE `enquiries` MODIFY `preferred_contact` VARCHAR(16) NULL DEFAULT NULL',
    'DO 0')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries' AND COLUMN_NAME = 'preferred_contact'
);
PREPARE stmt FROM @relax_pref; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- --------------------------------------------------------------------------
-- 6. Widen the workflow states to match register → call → WhatsApp.
--    Old values are kept so existing rows stay valid.
-- --------------------------------------------------------------------------
ALTER TABLE `enquiries`
  MODIFY `status` ENUM('new','called','whatsapp','contacted','enrolled','closed')
  NOT NULL DEFAULT 'new';

-- --------------------------------------------------------------------------
-- 7. Show the result, so you can see it worked.
-- --------------------------------------------------------------------------
SELECT COLUMN_NAME AS `Column`, COLUMN_TYPE AS `Type`, IS_NULLABLE AS `Nullable`
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enquiries'
ORDER BY ORDINAL_POSITION;
