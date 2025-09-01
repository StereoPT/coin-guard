"use server";

import { GetMonthlyCategories } from "@/actions/analytics/getMonthlyCategories";
import { GetMonthlyStats } from "@/actions/analytics/monthly/getMonthlyStats";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export const MonthlyAnalytics = async (month: number) => {
  const stats = await GetMonthlyStats(month);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: "DEBIT",
      date: {
        gte: startOfMonth(new Date(2025, month, 1)),
        lte: endOfMonth(new Date(2025, month, 1)),
      },
    },
  });

  const categoryStats = await GetMonthlyCategories(month);

  return { stats, transactions, categoryStats };
};
