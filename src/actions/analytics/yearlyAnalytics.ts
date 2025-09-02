"use server";

import { GetCategoriesForDate } from "@/actions/analytics/getCategoriesForDate";
import { GetStatsForDate } from "@/actions/analytics/getStatsForDate";
import prisma from "@/lib/prisma";
import { endOfYear, startOfYear } from "date-fns";

export const YearlyAnalytics = async (year: number) => {
  const dateFilter = {
    gte: startOfYear(new Date(year, 1, 1)),
    lte: endOfYear(new Date(year, 1, 1)),
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
