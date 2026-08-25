import { Analytics } from "@/actions/analytics/Analytics";
import { DashboardAnalytics } from "@/actions/analytics/dashboard/DashboardAnalytics";
import { KEYS } from "@/constants/queryKeys";
import type { DateRange } from "@/lib/date";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const dashboardAnalyticsOptions = () => {
  return queryOptions({
    queryKey: KEYS.analytics,
    queryFn: () => DashboardAnalytics(),
    throwOnError: true,
  });
};

export const analyticsOptions = (range: DateRange) => {
  return queryOptions({
    queryKey: KEYS.analyticsRange(range),
    queryFn: () => Analytics(range),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });
};
