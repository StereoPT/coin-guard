"use server";

import { GetCategoriesForDate } from "@/actions/analytics/GetCategoriesForDate";
import { GetStatsForDate } from "@/actions/analytics/GetStatsForDate";
import { TransactionType } from "@coin-guard/db";
import { prisma } from "@coin-guard/db/server";
import { endOfYear, startOfYear } from "date-fns";

export const YearlyAnalytics = async (year: number) => {
  const dateFilter = {
    gte: startOfYear(new Date(year, 1, 1)),
    lte: endOfYear(new Date(year, 1, 1)),
  };

  const stats = await GetStatsForDate(dateFilter);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: TransactionType.DEBIT,
      date: dateFilter,
    },
  });

  const monthlyCategoryStats = await GetCategoriesForDate(dateFilter);
  const categoryStats = monthlyCategoryStats.map((stat) => ({
    ...stat,
    budgetAmount: stat.budgetAmount !== null ? stat.budgetAmount * 12 : null,
  }));

  return { stats, transactions, categoryStats };
};
