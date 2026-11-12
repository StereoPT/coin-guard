import { expect, test } from "../../src/fixtures";
import {
  countTransactions,
  createTransaction,
  getTransaction,
} from "../../src/seed";
import { openEditTransactionDialog } from "../../src/transactionsDialogs";

test("edits a transaction", async ({ page, seed }) => {
  await createTransaction({
    accountId: seed.accountId,
    description: "Old description",
    amount: 20,
  });

  await page.goto("/transactions");
  const dialog = await openEditTransactionDialog(page, "Old description");
  await expect(dialog.getByLabel("Description")).toHaveValue("Old description");

  await dialog.getByLabel("Description").fill("New description");
  await dialog.getByLabel("Amount").fill("35");
  await dialog.getByRole("button", { name: "Edit Transaction" }).click();

  await expect(dialog).toBeHidden();
  const row = page.getByRole("row", { name: /New description/ });
  await expect(row).toContainText("35,00");
  await expect(page.getByText("Old description")).toHaveCount(0);
  expect(await countTransactions("Old description")).toBe(0);
  expect(await countTransactions("New description")).toBe(1);
});

test("edits a transaction's type and category", async ({ page, seed }) => {
  await createTransaction({
    accountId: seed.accountId,
    description: "Refund",
    type: "DEBIT",
    amount: 15,
  });

  await page.goto("/transactions");
  const dialog = await openEditTransactionDialog(page, "Refund");
  await expect(dialog.getByLabel("Description")).toHaveValue("Refund");

  await dialog.getByLabel("Type").click();
  await page.getByRole("option", { name: "Credit" }).click();
  await dialog.getByRole("button", { name: "Select a Category" }).click();
  await page.getByRole("option", { name: "Salary" }).click();
  await dialog.getByRole("button", { name: "Edit Transaction" }).click();

  await expect(dialog).toBeHidden();
  const row = page.getByRole("row", { name: /Refund/ });
  await expect(row).toContainText("Salary");
  await expect(row.locator('[data-slot="amount"]')).toHaveClass(
    /text-green-600/,
  );

  const saved = await getTransaction("Refund");
  expect(saved?.type).toBe("CREDIT");
  expect(saved?.category?.name).toBe("Salary");
});
