"use server";

import { GetDashboardCategories } from "@/actions/analytics/dashboard/GetDashboardCategories";
import { GetDashboardStats } from "@/actions/analytics/dashboard/GetDashboardStats";
import { GetLastTransactions } from "@/actions/analytics/dashboard/GetLastTransactions";

export const DashboardAnalytics = async () => {
  const stats = await GetDashboardStats();
  const lastFiveTransactions = await GetLastTransactions(5);
  const categoryStats = await GetDashboardCategories();

  return { stats, categoryStats, lastFiveTransactions };
};
