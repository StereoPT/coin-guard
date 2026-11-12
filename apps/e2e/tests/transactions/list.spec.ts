import { expect, test } from "../../src/fixtures";
import { createTransaction } from "../../src/seed";

test("lists seeded transactions", async ({ page, seed }) => {
  await createTransaction({
    accountId: seed.accountId,
    categoryId: seed.groceriesId,
    description: "Supermarket run",
    amount: 42.5,
  });

  await createTransaction({
    accountId: seed.accountId,
    description: "Mystery charge",
    amount: 7,
  });

  await page.goto("/transactions");

  const supermarket = page.getByRole("row", { name: /Supermarket run/ });
  await expect(supermarket).toBeVisible();
  await expect(supermarket).toContainText("Groceries");
  await expect(supermarket).toContainText("42,50");

  const mystery = page.getByRole("row", { name: /Mystery charge/ });
  await expect(mystery).toContainText("Uncategorized");
});

test("shows credit and transfer amounts with their own variant", async ({
  page,
  seed,
}) => {
  await createTransaction({
    accountId: seed.accountId,
    description: "Monthly salary",
    type: "CREDIT",
    amount: 1500,
  });
  await createTransaction({
    accountId: seed.accountId,
    description: "To savings",
    type: "TRANSFER",
    amount: 200,
  });
  await createTransaction({
    accountId: seed.accountId,
    description: "Lunch",
    type: "DEBIT",
    amount: 9,
  });

  await page.goto("/transactions");

  const amountOf = (description: RegExp) =>
    page
      .getByRole("row", { name: description })
      .locator('[data-slot="amount"]');

  await expect(amountOf(/Monthly salary/)).toContainText("1500,00");
  await expect(amountOf(/Monthly salary/)).toHaveClass(/text-green-600/);
  await expect(amountOf(/To savings/)).toContainText("200,00");
  await expect(amountOf(/To savings/)).toHaveClass(/text-slate-600/);
  await expect(amountOf(/Lunch/)).toHaveClass(/text-red-600/);
});
