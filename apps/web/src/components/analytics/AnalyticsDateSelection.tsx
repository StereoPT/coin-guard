"use client";

import { DateRangeSelection } from "@/components/DateRangeSelection";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { analyticsRangeAtom } from "@/store/analyticsStore";
import { useAtom } from "jotai";

export const AnalyticsDateSelection = () => {
  const [range, setRange] = useAtom(analyticsRangeAtom);
  const { isFetching } = useAnalytics(range);

  return (
    <DateRangeSelection
      isFetching={isFetching}
      onRangeChange={setRange}
      range={range}
    />
  );
};
