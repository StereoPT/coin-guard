import type { Prisma } from "@coin-guard/db";
import type { TransactionType } from "@coin-guard/db";

export type TransactionWithRelations = Prisma.TransactionGetPayload<{
  include: { category: true; account: true };
}>;

export type TransactionValue = Record<TransactionType, number>;
