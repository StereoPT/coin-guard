import { DashboardAnalytics } from '@/actions/analytics/dashboardAnalytics';
import { KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: KEYS.analytics,
    queryFn: () => DashboardAnalytics(),
  });
};
