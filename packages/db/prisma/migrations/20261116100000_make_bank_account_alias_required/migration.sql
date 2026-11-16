-- Backfill existing accounts without an alias (CGD was the only supported bank)
UPDATE "BankAccount" SET "alias" = 'CGD' WHERE "alias" IS NULL OR btrim("alias") = '';

-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "alias" SET NOT NULL;
