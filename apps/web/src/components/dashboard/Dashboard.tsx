"use client";

import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardLastTransactions } from "@/components/dashboard/DashboardLastTransactions";
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
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
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
      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-5 xl:col-span-3">
          <DashboardLastTransactions
            transactions={analytics.lastFiveTransactions}
          />
        </div>
        <div className="col-span-5 xl:col-span-2">
          <CategoryPieChart
            categoryStats={analytics.categoryStats}
            description={`Last Update - ${format(endOfMonth(subMonths(new Date(), 1)), "PPP")}`}
            title="Category Summary"
          />
        </div>
      </div>
    </div>
  );
};
