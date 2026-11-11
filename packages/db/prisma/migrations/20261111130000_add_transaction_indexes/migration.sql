-- DropIndex
-- Redundant: the primary key on "id" already enforces uniqueness.
DROP INDEX "Transaction_id_key";

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");

-- CreateIndex
CREATE INDEX "Transaction_accountId_date_idx" ON "Transaction"("accountId", "date");

-- CreateIndex
CREATE INDEX "Transaction_categoryId_date_idx" ON "Transaction"("categoryId", "date");
