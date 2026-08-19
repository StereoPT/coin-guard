"use server";

import { GetCategoriesForDate } from "@/actions/analytics/GetCategoriesForDate";
import { GetStatsForDate } from "@/actions/analytics/GetStatsForDate";
import { getBudgetScaleFactor } from "@/lib/date";
import { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const Analytics = async (range: { from: Date; to: Date }) => {
  const dateFilter = {
    gte: range.from,
    lte: range.to,
  };

  const stats = await GetStatsForDate(dateFilter);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: TransactionType.DEBIT,
      date: dateFilter,
    },
  });

  const rawCategoryStats = await GetCategoriesForDate(dateFilter);
  const scaleFactor = getBudgetScaleFactor(range.from, range.to);
  const categoryStats = rawCategoryStats.map((stat) => ({
    ...stat,
    budgetAmount:
      stat.budgetAmount !== null ? stat.budgetAmount * scaleFactor : null,
  }));

  return { stats, transactions, categoryStats };
};
