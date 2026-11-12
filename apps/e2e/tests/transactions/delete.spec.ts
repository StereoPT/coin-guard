import { expect, test } from "../../src/fixtures";
import { countTransactions, createTransaction } from "../../src/seed";

test("deletes a transaction", async ({ page, seed }) => {
  await createTransaction({
    accountId: seed.accountId,
    description: "Delete me",
  });
  await createTransaction({
    accountId: seed.accountId,
    description: "Keep me",
  });

  await page.goto("/transactions");
  await page.getByRole("button", { name: "Delete Delete me" }).click();

  const alert = page.getByRole("alertdialog");
  await expect(alert).toContainText("Delete me");
  await alert.getByRole("button", { name: "Delete" }).click();

  await expect(alert).toBeHidden();
  await expect(page.getByRole("row", { name: /Delete me/ })).toHaveCount(0);
  await expect(page.getByRole("row", { name: /Keep me/ })).toBeVisible();
  expect(await countTransactions("Delete me")).toBe(0);
  expect(await countTransactions("Keep me")).toBe(1);
});
