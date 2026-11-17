import { faker } from "@faker-js/faker";
import { TransactionType, type Transaction } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryTransaction = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

const money = (min: number, max: number) =>
  faker.number.float({ min, max, fractionDigits: 2 });

const AMOUNT_RANGE: Record<TransactionType, () => number> = {
  [TransactionType.CREDIT]: () => money(50, 3000),
  [TransactionType.DEBIT]: () => money(1, 300),
  [TransactionType.TRANSFER]: () => money(20, 1000),
};

export const TransactionFactory = buildFactory<FactoryTransaction>(() => {
  const type = faker.helpers.enumValue(TransactionType);

  return {
    date: faker.date.recent({ days: 90 }),
    description: faker.company.name(),
    type,
    amount: AMOUNT_RANGE[type](),
    // Placeholder: the seed should compute a consistent running balance per account
    balance: money(0, 10000),
    note:
      faker.helpers.maybe(() => faker.lorem.sentence(), {
        probability: 0.2,
      }) ?? null,
    categoryId: null,
    accountId: faker.string.uuid(),
  };
});
