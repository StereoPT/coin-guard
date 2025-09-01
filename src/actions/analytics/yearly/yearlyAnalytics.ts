"use server";

import { GetYearlyCategories } from "@/actions/analytics/yearly/getYearlyCategories";
import { getYearlyStats } from "@/actions/analytics/yearly/getYearlyStats";
import prisma from "@/lib/prisma";
import { endOfYear, startOfYear } from "date-fns";

export const YearlyAnalytics = async (year: number) => {
  const stats = await getYearlyStats(year);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: "DEBIT",
      date: {
        gte: startOfYear(new Date(year, 1, 1)),
        lte: endOfYear(new Date(year, 1, 1)),
      },
    },
  });

  const categoryStats = await GetYearlyCategories(year);

  return { stats, transactions, categoryStats };
};
