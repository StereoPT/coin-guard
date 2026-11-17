/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { faker } from "@faker-js/faker";
import { TransactionFactory } from "../factories/transactions";
import type { BankAccount, Category } from "../generated/prisma/client";
import { prisma } from "../prisma";

export const CreateTransactions = async (
  categories: Category[],
  bankAccounts: BankAccount[],
) => {
  console.log("💸 Creating transactions...");

  const data = bankAccounts.flatMap((account) =>
    TransactionFactory.createMany(
      faker.number.int({ min: 30, max: 70 }),
      () => ({
        accountId: account.id,
        categoryId:
          faker.helpers.maybe(() => faker.helpers.arrayElement(categories).id, {
            probability: 0.6,
          }) ?? null,
      }),
    ),
  );

  const { count } = await prisma.transaction.createMany({ data });

  console.log(`✅ Created ${count} transactions`);
  console.log();

  return count;
};
