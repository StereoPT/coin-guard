import { MonthlyAnalytics } from "@/actions/analytics/monthly/monthlyAnalytics";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyAnalytics = (month: number) => {
  return useQuery({
    queryKey: KEYS.monthlyAnalytics(month),
    queryFn: () => MonthlyAnalytics(month),
  });
};
