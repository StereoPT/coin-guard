"use client";

import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { MonthlyChart } from "@/components/charts/MonthlyChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { StatCard } from "@/components/StatCard";
import { useMonthlyAnalytics } from "@/hooks/analytics/useMonthlyAnalytics";
import { monthlyAnalyticsAtom } from "@/store/analyticsStore";
import { CountType } from "@/types/dashboard";
import { useAtomValue } from "jotai";

export const MonthlyAnalytics = () => {
  const selectedMonth = useAtomValue(monthlyAnalyticsAtom);
  const { data: analytics } = useMonthlyAnalytics(selectedMonth);

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CREDIT }}
          subfooter="Income for the month"
          title="Income"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.DEBIT }}
          subfooter="Expenses for the month"
          title="Expenses"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={{ value: analytics.stats.CASH_FLOW }}
          subfooter="Cash Flow for the month"
          title="Cash Flow"
        />
      </div>
      <div className="grid gap-4 grid-cols-5 items-stretch">
        <div className="col-span-5 xl:col-span-3 h-full">
          <MonthlyChart transactions={analytics.transactions} />
        </div>
        <div className="col-span-5 xl:col-span-2 h-full">
          <CategoryPieChart categoryStats={analytics.categoryStats} />
        </div>
      </div>
    </div>
  );
};
