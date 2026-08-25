"use client";

import { AnalyticsChart } from "@/components/charts/AnalyticsChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { LoadingState } from "@/components/LoadingState";
import { StatCard } from "@/components/StatCard";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { analyticsRangeAtom } from "@/store/analyticsStore";
import { CountType } from "@/types/dashboard";
import { useAtomValue } from "jotai";

export const Analytics = () => {
  const range = useAtomValue(analyticsRangeAtom);
  const { data: analytics, isPending } = useAnalytics(range);

  if (isPending || !analytics) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CREDIT }}
          subfooter="Income for the selected period"
          title="Income"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.DEBIT }}
          subfooter="Expenses for the selected period"
          title="Expenses"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CASH_FLOW }}
          subfooter="Cash Flow for the selected period"
          title="Cash Flow"
        />
      </div>
      <div className="grid gap-4 grid-cols-5 items-stretch">
        <div className="col-span-5 xl:col-span-3 h-full">
          <AnalyticsChart range={range} transactions={analytics.transactions} />
        </div>
        <div className="col-span-5 xl:col-span-2 h-full">
          <CategoryPieChart categoryStats={analytics.categoryStats} />
        </div>
      </div>
    </div>
  );
};
