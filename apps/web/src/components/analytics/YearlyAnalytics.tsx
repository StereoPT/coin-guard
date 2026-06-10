"use client";

import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { YearlyChart } from "@/components/charts/YearlyChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { StatCard } from "@/components/StatCard";
import { useYearlyAnalytics } from "@/hooks/analytics/useYearlyAnalytics";
import { yearlyAnalyticsAtom } from "@/store/analyticsStore";
import { CountType } from "@/types/dashboard";
import { useAtomValue } from "jotai";

export const YearlyAnalytics = () => {
  const selectedYear = useAtomValue(yearlyAnalyticsAtom);
  const { data: analytics } = useYearlyAnalytics(selectedYear);

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CREDIT }}
          subfooter="Income for the year"
          title="Income"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.DEBIT }}
          subfooter="Expenses for the year"
          title="Expenses"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CASH_FLOW }}
          subfooter="Cash Flow for the year"
          title="Cash Flow"
        />
      </div>
      <div className="grid gap-4 grid-cols-5 items-stretch">
        <div className="col-span-5 xl:col-span-3 h-full">
          <YearlyChart transactions={analytics.transactions} />
        </div>
        <div className="col-span-5 xl:col-span-2 h-full">
          <CategoryPieChart categoryStats={analytics.categoryStats} />
        </div>
      </div>
    </div>
  );
};
