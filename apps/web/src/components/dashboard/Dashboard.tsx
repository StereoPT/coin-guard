"use client";

import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DisplayLastTransactions } from "@/components/dashboard/DisplayLastTransactions";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useDashboardAnalytics } from "@/hooks/analytics/useDashboardAnalytics";
import { CountType } from "@/types/dashboard";
import { endOfMonth, format, subMonths } from "date-fns";

export const Dashboard = () => {
  const { data: analytics } = useDashboardAnalytics();

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-3">
        <DashboardCard
          countType={CountType.MONEY}
          stat={analytics.stats.CREDIT}
          subfooter="Income for the last month"
          title="Income"
        />
        <DashboardCard
          countType={CountType.MONEY}
          stat={analytics.stats.DEBIT}
          subfooter="Expenses for the last month"
          title="Expenses"
        />
        <DashboardCard
          countType={CountType.NUMBER}
          stat={analytics.stats.TRANSACTIONS}
          subfooter="Transaction amount for the last month"
          title="Transactions"
        />
      </div>
      <div className="grid grid-cols-12 grid-rows-4 gap-4">
        <CategoryPieChart
          categoryStats={analytics.categoryStats}
          className="col-span-4 row-span-5 col-start-9"
          description={`Last Update - ${format(endOfMonth(subMonths(new Date(), 1)), "PPP")}`}
          title="Category Summary"
        />
        <DisplayLastTransactions
          className="col-span-8 row-span-4 row-start-2"
          transactions={analytics.lastFiveTransactions}
        />
      </div>
    </div>
  );
};
