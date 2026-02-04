"use server";

import { GetCategoriesForDate } from "@/actions/analytics/getCategoriesForDate";
import { GetStatsForDate } from "@/actions/analytics/getStatsForDate";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export const MonthlyAnalytics = async (month: number) => {
  const dateFilter = {
    gte: startOfMonth(new Date(2026, month, 1)),
    lte: endOfMonth(new Date(2026, month, 1)),
  };

  const stats = await GetStatsForDate(dateFilter);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: "DEBIT",
      date: dateFilter,
    },
  });

  const categoryStats = await GetCategoriesForDate(dateFilter);

  return { stats, transactions, categoryStats };
};
