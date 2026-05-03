import { dashboardAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { useQuery } from "@tanstack/react-query";

export const useDashboardAnalytics = () => {
  return useQuery(dashboardAnalyticsOptions());
};
