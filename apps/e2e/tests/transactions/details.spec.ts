import { expect, test } from "../../src/fixtures";
import { createTransaction } from "../../src/seed";

test("opens the transaction details page", async ({ page, seed }) => {
  await createTransaction({
    accountId: seed.accountId,
    categoryId: seed.groceriesId,
    description: "Weekly shop",
    type: "DEBIT",
    amount: 64.2,
    date: new Date("2026-03-15T12:00:00"),
    note: "Bought for the party",
  });

  await page.goto("/transactions");
  await page.getByRole("link", { name: /Weekly shop/ }).click();

  await expect(page).toHaveURL(/\/transactions\/[\w-]+$/);
  await expect(
    page.getByRole("heading", { name: "Transaction Details" }),
  ).toBeVisible();
  await expect(page.getByText("Weekly shop").first()).toBeVisible();
  await expect(page.getByText("debit", { exact: true })).toBeVisible();
  await expect(page.getByText("Main Account")).toBeVisible();
  await expect(page.getByText("March 15th, 2026")).toBeVisible();
  await expect(page.getByText("Groceries")).toBeVisible();
  await expect(page.getByText("Bought for the party")).toBeVisible();
});
