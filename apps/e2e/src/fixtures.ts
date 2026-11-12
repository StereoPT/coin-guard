import { test as base } from "@playwright/test";
import { resetDatabase } from "./database";
import { createBankAccount, createCategory } from "./seed";

type Seed = {
  accountId: string;
  groceriesId: string;
  salaryId: string;
};

/**
 * Shared `test` for every spec. The auto fixture gives each test an empty
 * database with one default bank account and the "Groceries"/"Salary" categories.
 */
export const test = base.extend<{ seed: Seed }>({
  seed: [
    // biome-ignore lint/correctness/noEmptyPattern: Playwright requires destructuring the first argument
    async ({}, use) => {
      await resetDatabase(process.env.E2E_DATABASE_URL);
      const accountId = await createBankAccount();
      const groceriesId = await createCategory("Groceries");
      const salaryId = await createCategory("Salary");
      await use({ accountId, groceriesId, salaryId });
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
