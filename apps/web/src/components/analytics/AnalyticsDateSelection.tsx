"use client";

import { DateRangeSelection } from "@/components/DateRangeSelection";
import { analyticsRangeAtom } from "@/store/analyticsStore";
import { useAtom } from "jotai";

export const AnalyticsDateSelection = () => {
  const [range, setRange] = useAtom(analyticsRangeAtom);

  return <DateRangeSelection onRangeChange={setRange} range={range} />;
};
