import type { Prisma } from "@/generated/prisma/client";

export type CategoryWithTransactions = Prisma.CategoryGetPayload<{
  include: { transactions: true };
}>;

export type CategoryWithLookups = Prisma.CategoryGetPayload<{
  include: { lookups: true };
}>;

export type CategoryStats = {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
};
