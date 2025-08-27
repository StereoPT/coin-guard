"use server";

import { TransactionType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export type GetCategoryStatsReturnValue = {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
};

export const GetCategoryStats = async (): Promise<
  GetCategoryStatsReturnValue[]
> => {
  const categoryTotals = await prisma.transaction.groupBy({
    by: "categoryId",
    _sum: {
      amount: true,
    },
    where: {
      date: {
        gte: startOfMonth(subMonths(new Date(), 1)),
        lte: endOfMonth(subMonths(new Date(), 1)),
      },
      type: {
        equals: TransactionType.DEBIT,
      },
    },
  });

  const categoryIds = categoryTotals
    .map((item) => item.categoryId)
    .filter((id): id is string => id !== null);

  const categories = await prisma.category.findMany({
    where: {
      id: { in: categoryIds },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));

  const result = categoryTotals.map((item) => ({
    categoryId: item.categoryId ?? "-1",
    categoryName: item.categoryId
      ? (categoryMap.get(item.categoryId) ?? "")
      : "Uncategorized",
    totalAmount: item._sum.amount ?? 0,
  }));

  return result;
};
