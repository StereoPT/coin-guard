import { monthlyAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyAnalytics = (month: number) => {
  return useQuery(monthlyAnalyticsOptions(month));
};
