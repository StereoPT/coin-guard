-- Migration to convert DateTime fields from unixepoch-ms to ISO 8601 format
-- Preserves all foreign key relationships

PRAGMA foreign_keys=OFF;

-- ============================================
-- Category table (migrate first due to FK dependency)
-- ============================================

CREATE TABLE "Category_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "Category_new" ("id", "name", "createdAt", "updatedAt")
SELECT 
    "id",
    "name",
    datetime("createdAt" / 1000.0, 'unixepoch'),
    datetime("updatedAt" / 1000.0, 'unixepoch')
FROM "Category";

DROP TABLE "Category";
ALTER TABLE "Category_new" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- ============================================
-- Transaction table
-- ============================================

CREATE TABLE "Transaction_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL CHECK("type" IN ('CREDIT', 'DEBIT')),
    "amount" REAL NOT NULL,
    "balance" REAL NOT NULL,
    "note" TEXT,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "Transaction_new" ("id", "date", "description", "type", "amount", "balance", "note", "categoryId", "createdAt", "updatedAt")
SELECT 
    "id",
    datetime("date" / 1000.0, 'unixepoch'),
    "description",
    "type",
    "amount",
    "balance",
    "note",
    "categoryId",
    datetime("createdAt" / 1000.0, 'unixepoch'),
    datetime("updatedAt" / 1000.0, 'unixepoch')
FROM "Transaction";

DROP TABLE "Transaction";
ALTER TABLE "Transaction_new" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

PRAGMA foreign_keys=ON;