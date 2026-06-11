"use client";

import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { DashboardLastTransactions } from "@/components/dashboard/DashboardLastTransactions";
import { ErrorAlert } from "@/components/ErrorAlert";
import { StatCard } from "@/components/StatCard";
import { useDashboardAnalytics } from "@/hooks/analytics/useDashboardAnalytics";
import { CountType } from "@/types/dashboard";

export const Dashboard = () => {
  const { data: analytics } = useDashboardAnalytics();

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <StatCard
          countType={CountType.MONEY}
          stat={analytics.stats.CREDIT}
          subfooter="Income for the last month"
          title="Income"
        />
        <StatCard
          countType={CountType.MONEY}
          stat={analytics.stats.DEBIT}
          subfooter="Expenses for the last month"
          title="Expenses"
        />
        <StatCard
          countType={CountType.NUMBER}
          stat={analytics.stats.TRANSACTIONS}
          subfooter="Transaction amount for the last month"
          title="Transactions"
        />
      </div>
      <div className="grid gap-4 grid-cols-5 items-stretch">
        <div className="col-span-5 xl:col-span-3 h-full">
          <DashboardLastTransactions
            transactions={analytics.lastFiveTransactions}
          />
        </div>
        <div className="col-span-5 xl:col-span-2 h-full">
          <CategoryPieChart categoryStats={analytics.categoryStats} />
        </div>
      </div>
    </div>
  );
};
