-- INFO logs are no longer written; remove the existing ones before the enum
-- value they depend on is dropped.
DELETE FROM "LookupLogging" WHERE "type" = 'INFO';

/*
  Warnings:

  - The values [INFO] on the enum `LoggingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoggingType_new" AS ENUM ('ERROR');
ALTER TABLE "LookupLogging" ALTER COLUMN "type" TYPE "LoggingType_new" USING ("type"::text::"LoggingType_new");
ALTER TYPE "LoggingType" RENAME TO "LoggingType_old";
ALTER TYPE "LoggingType_new" RENAME TO "LoggingType";
DROP TYPE "LoggingType_old";
COMMIT;
