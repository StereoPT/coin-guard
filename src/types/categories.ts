import type { Prisma } from "@/generated/prisma";

export type CategoryWithTransactions = Prisma.CategoryGetPayload<{
  include: { transactions: true };
}>;

export type CategoryStats = {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
};
