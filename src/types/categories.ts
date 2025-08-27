import type { Prisma } from "@/generated/prisma";

export type CategoryWithTransactions = Prisma.CategoryGetPayload<{
  include: { transactions: true };
}>;
