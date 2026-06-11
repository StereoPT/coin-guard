"use server";

import { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export const GetDashboardCategories = async () => {
  const dateFilterCurrentMonth = {
    gte: startOfMonth(subMonths(new Date(), 1)),
    lte: endOfMonth(subMonths(new Date(), 1)),
  };

  const categoryTotals = await prisma.transaction.groupBy({
    by: "categoryId",
    _sum: {
      amount: true,
    },
    where: {
      date: dateFilterCurrentMonth,
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
    },
  });

  const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));

  const result = categoryTotals.map((item) => {
    const categoryId = item.categoryId ?? "NoCategory";
    const categoryName = categoryMap.get(categoryId) ?? "Uncategorized";

    return {
      categoryId,
      categoryName,
      totalAmount: item._sum.amount ?? 0,
      fill: `var(--color-${categoryId})`,
    };
  });

  return result;
};
