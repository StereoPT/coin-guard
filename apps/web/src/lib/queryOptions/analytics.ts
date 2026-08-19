import { Analytics } from "@/actions/analytics/Analytics";
import { DashboardAnalytics } from "@/actions/analytics/dashboard/DashboardAnalytics";
import { YearlyAnalytics } from "@/actions/analytics/YearlyAnalytics";
import { KEYS } from "@/constants/queryKeys";
import type { AnalyticsDateRange } from "@/lib/date";
import { queryOptions } from "@tanstack/react-query";

export const dashboardAnalyticsOptions = () => {
  return queryOptions({
    queryKey: KEYS.analytics,
    queryFn: () => DashboardAnalytics(),
  });
};

export const yearlyAnalyticsOptions = (year: number) => {
  return queryOptions({
    queryKey: KEYS.yearlyAnalytics(year),
    queryFn: () => YearlyAnalytics(year),
  });
};

export const analyticsOptions = (range: AnalyticsDateRange) => {
  return queryOptions({
    queryKey: KEYS.analyticsRange(range.from, range.to),
    queryFn: () => Analytics(range),
  });
};
