"use server";

import { GetCategoriesForDate } from "@/actions/analytics/getCategoriesForDate";
import { GetLastTransactions } from "@/actions/analytics/getLastTransactions";
import { GetStats } from "@/actions/analytics/getStats";
import { endOfMonth, getMonth, startOfMonth, subMonths } from "date-fns";

export const DashboardAnalytics = async () => {
  const lastMonth = getMonth(subMonths(new Date(), 1));
  const dateFilter = {
    gte: startOfMonth(new Date(2025, lastMonth, 1)),
    lte: endOfMonth(new Date(2025, lastMonth, 1)),
  };

  const stats = await GetStats();
  const categoryStats = await GetCategoriesForDate(dateFilter);
  const lastFiveTransactions = await GetLastTransactions(5);

  return { stats, categoryStats, lastFiveTransactions };
};
