"use server";

import { GetDashboardStats } from "@/actions/analytics/dashboard/GetDashboardStats";
import { GetCategoriesForDate } from "@/actions/analytics/getCategoriesForDate";
import { GetLastTransactions } from "@/actions/analytics/getLastTransactions";
import { endOfMonth, getMonth, startOfMonth, subMonths } from "date-fns";

export const DashboardAnalytics = async () => {
  const lastMonth = getMonth(subMonths(new Date(), 1));
  const dateFilter = {
    gte: startOfMonth(new Date(2026, lastMonth, 1)),
    lte: endOfMonth(new Date(2026, lastMonth, 1)),
  };

  const stats = await GetDashboardStats();
  const lastFiveTransactions = await GetLastTransactions(5);
  const categoryStats = await GetCategoriesForDate(dateFilter);

  return { stats, categoryStats, lastFiveTransactions };
};
