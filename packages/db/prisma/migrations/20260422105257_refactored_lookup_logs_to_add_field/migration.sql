/*
  Warnings:

  - You are about to drop the column `message` on the `LookupLogging` table. All the data in the column will be lost.
  - Added the required column `description` to the `LookupLogging` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lookupField` to the `LookupLogging` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LookupLogging" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "lookupField" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_LookupLogging" ("createdAt", "id", "type", "updatedAt") SELECT "createdAt", "id", "type", "updatedAt" FROM "LookupLogging";
DROP TABLE "LookupLogging";
ALTER TABLE "new_LookupLogging" RENAME TO "LookupLogging";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
