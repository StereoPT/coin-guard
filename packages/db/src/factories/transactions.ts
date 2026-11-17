import { faker } from "@faker-js/faker";
import { TransactionType, type Transaction } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryTransaction = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

const money = (min: number, max: number) =>
  faker.number.float({ min, max, fractionDigits: 2 });

const TYPE_WEIGHTS = [
  { value: TransactionType.DEBIT, weight: 85 },
  { value: TransactionType.CREDIT, weight: 5 },
  { value: TransactionType.TRANSFER, weight: 10 },
];

const AMOUNT_RANGE: Record<TransactionType, () => number> = {
  [TransactionType.CREDIT]: () => money(800, 2500),
  [TransactionType.DEBIT]: () => money(1, 150),
  [TransactionType.TRANSFER]: () => money(20, 500),
};

export const TransactionFactory = buildFactory<FactoryTransaction>(() => {
  const type = faker.helpers.weightedArrayElement(TYPE_WEIGHTS);

  return {
    date: faker.date.recent({ days: 180 }),
    description: faker.company.name(),
    type,
    amount: AMOUNT_RANGE[type](),
    balance: money(0, 10000),
    note:
      faker.helpers.maybe(() => faker.lorem.sentence(), {
        probability: 0.2,
      }) ?? null,
    categoryId: null,
    accountId: faker.string.uuid(),
  };
});
