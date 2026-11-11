import { expect, test } from "../../src/fixtures";
import { countTransactions } from "../../src/seed";
import { openAddTransactionDialog } from "../../src/transactionsDialogs";

test("adds a transaction", async ({ page }) => {
  await page.goto("/transactions");
  const dialog = await openAddTransactionDialog(page);
  await expect(dialog).toBeVisible();

  // Dates in the future are disabled, so pick the 1st of the current month.
  await dialog.getByRole("button", { name: "Date", exact: true }).click();
  await page
    .locator("button[data-day]:enabled")
    .getByText("1", { exact: true })
    .click();
  await page.keyboard.press("Escape");

  await dialog.getByLabel("Type").click();
  await page.getByRole("option", { name: "Debit" }).click();

  await dialog.getByLabel("Description").fill("Coffee beans");
  await dialog.getByLabel("Amount").fill("12.5");
  await dialog.getByLabel("Balance").fill("987.5");

  await dialog.getByRole("button", { name: "Select a Category" }).click();
  await page.getByRole("option", { name: "Groceries" }).click();

  await dialog.getByRole("button", { name: "Add Transaction" }).click();

  await expect(dialog).toBeHidden();
  const row = page.getByRole("row", { name: /Coffee beans/ });
  await expect(row).toBeVisible();
  await expect(row).toContainText("Groceries");
  await expect(row).toContainText("12,50");
  expect(await countTransactions("Coffee beans")).toBe(1);
});

test("does not create a transaction when required fields are missing", async ({
  page,
}) => {
  await page.goto("/transactions");
  const dialog = await openAddTransactionDialog(page);

  await dialog.getByLabel("Description").fill("Incomplete");
  await dialog.getByRole("button", { name: "Add Transaction" }).click();

  // Date and type are required, so the dialog stays open with the form invalid.
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("alert").first()).toBeVisible();
  expect(await countTransactions()).toBe(0);
});
