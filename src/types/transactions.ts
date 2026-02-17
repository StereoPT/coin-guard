import type { Prisma, TransactionType } from "@/generated/prisma/enums";

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

export type TransactionValue = Record<TransactionType, number>;
