"use server";

import { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const GetCategoriesForDate = async (dateFilter: {
  gte: Date;
  lte: Date;
}) => {
  const categoryTotals = await prisma.transaction.groupBy({
    by: "categoryId",
    _sum: {
      amount: true,
    },
    where: {
      date: dateFilter,
      type: {
        equals: TransactionType.DEBIT,
      },
    },
    orderBy: {
      _sum: { amount: "desc" },
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
      budgetAmount: true,
    },
  });

  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  const result = categoryTotals.map((item) => {
    const categoryId = item.categoryId ?? "-1";
    const categoryName = categoryMap.get(categoryId)?.name ?? "Uncategorized";

    return {
      categoryId,
      categoryName,
      totalAmount: item._sum.amount ?? 0,
      budgetAmount: categoryMap.get(categoryId)?.budgetAmount ?? null,
    };
  });

  return result;
};
