'use server';

import { GetCategoryStats } from '@/actions/analytics/getCategoryStats';
import { GetLastTransactions } from '@/actions/analytics/getLastTransactions';
import { GetStats } from '@/actions/analytics/getStats';

export const DashboardAnalytics = async () => {
  const stats = await GetStats();
  const categoryStats = await GetCategoryStats();
  const lastFiveTransactions = await GetLastTransactions(5);

  return { stats, categoryStats, lastFiveTransactions };
};
