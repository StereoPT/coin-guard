"use server";

import { GetCategoriesForDate } from "@/actions/analytics/GetCategoriesForDate";
import { GetStatsForDate } from "@/actions/analytics/GetStatsForDate";
import type { DateRange } from "@/lib/date";
import { getBudgetScaleFactor } from "@/lib/date";
import { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";

export const Analytics = async (range: DateRange) => {
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
  const scaleFactor = getBudgetScaleFactor(range);
  const categoryStats = rawCategoryStats.map((stat) => ({
    ...stat,
    budgetAmount:
      stat.budgetAmount !== null ? stat.budgetAmount * scaleFactor : null,
  }));

  return { stats, transactions, categoryStats };
};
