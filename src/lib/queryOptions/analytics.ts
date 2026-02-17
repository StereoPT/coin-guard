import { DashboardAnalytics } from "@/actions/analytics/dashboardAnalytics";
import { MonthlyAnalytics } from "@/actions/analytics/monthlyAnalytics";
import { YearlyAnalytics } from "@/actions/analytics/yearlyAnalytics";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const dashboardAnalyticsOptions = () => {
  return queryOptions({
    queryKey: KEYS.analytics,
    queryFn: () => DashboardAnalytics(),
  });
};

export const monthlyAnalyticsOptions = (month: number) => {
  return queryOptions({
    queryKey: KEYS.monthlyAnalytics(month),
    queryFn: () => MonthlyAnalytics(month),
  });
};

export const yearlyAnalyticsOptions = (year: number) => {
  return queryOptions({
    queryKey: KEYS.yearlyAnalytics(year),
    queryFn: () => YearlyAnalytics(year),
  });
};
