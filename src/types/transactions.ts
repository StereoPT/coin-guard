import type { Prisma, TransactionType } from "@/generated/prisma";

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

export type TransactionValue = Record<TransactionType, number>;
