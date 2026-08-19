import type { AnalyticsDateRange } from "@/lib/date";
import { analyticsOptions } from "@/lib/queryOptions/analytics";
import { useQuery } from "@tanstack/react-query";

export const useAnalytics = (range: AnalyticsDateRange) => {
  return useQuery(analyticsOptions(range));
};
