import { yearlyAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { useQuery } from "@tanstack/react-query";

export const useYearlyAnalytics = (year: number) => {
  return useQuery(yearlyAnalyticsOptions(year));
};
