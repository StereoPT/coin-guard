'use server';

import { GetCategoryStats } from '@/actions/analytics/getCategoryStats';
import { GetStats } from '@/actions/analytics/getStats';

export const DashboardAnalytics = async () => {
  const stats = await GetStats();
  const categoryStats = await GetCategoryStats();

  return { stats, categoryStats };
};
