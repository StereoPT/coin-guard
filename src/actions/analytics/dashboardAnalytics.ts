"use server";

import { GetLastTransactions } from "@/actions/analytics/getLastTransactions";
import { GetMonthlyCategories } from "@/actions/analytics/getMonthlyCategories";
import { GetStats } from "@/actions/analytics/getStats";
import { getMonth, subMonths } from "date-fns";

export const DashboardAnalytics = async () => {
  const lastMonth = getMonth(subMonths(new Date(), 1));

  const stats = await GetStats();
  const categoryStats = await GetMonthlyCategories(lastMonth);
  const lastFiveTransactions = await GetLastTransactions(5);

  return { stats, categoryStats, lastFiveTransactions };
};
