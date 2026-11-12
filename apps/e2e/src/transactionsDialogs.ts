import type { Page } from "@playwright/test";

/** Opens the "Create Transaction" dialog from the transactions page header. */
export async function openAddTransactionDialog(page: Page) {
  // The add action is an icon-only dropdown trigger next to "Import Transactions".
  await page.locator('[data-slot="button-group"] button').last().click();
  await page.getByRole("menuitem", { name: "Add Transaction" }).click();

  return page.getByRole("dialog", { name: "Create Transaction" });
}

/** Opens the "Edit Transaction" dialog for the row with this description. */
export async function openEditTransactionDialog(
  page: Page,
  description: string,
) {
  await page.getByRole("button", { name: `Edit ${description}` }).click();

  return page.getByRole("dialog", { name: "Edit Transaction" });
}
