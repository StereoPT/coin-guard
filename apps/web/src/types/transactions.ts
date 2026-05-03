import type { Prisma } from "@coin-guard/db";
import type { TransactionType } from "@coin-guard/db";

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

export type TransactionValue = Record<TransactionType, number>;
