import type { Prisma } from "@/generated/prisma/client";
import type { TransactionType } from "@/generated/prisma/enums";

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

export type TransactionValue = Record<TransactionType, number>;
