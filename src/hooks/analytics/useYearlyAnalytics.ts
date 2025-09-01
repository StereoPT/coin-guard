import { YearlyAnalytics } from "@/actions/analytics/yearly/yearlyAnalytics";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useYearlyAnalytics = (year: number) => {
  return useQuery({
    queryKey: KEYS.yearlyAnalytics(year),
    queryFn: () => YearlyAnalytics(year),
  });
};
