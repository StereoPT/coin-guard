"use client";

import { StatCard } from "@/components/analytics/StatCard";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { DisplayLastTransactions } from "@/components/dashboard/DisplayLastTransactions";
import { ErrorAlert } from "@/components/ErrorAlert";
import { TransactionType } from "@/generated/prisma";
import { useDashboardAnalytics } from "@/hooks/analytics/useDashboardAnalytics";
import { endOfMonth, format, subMonths } from "date-fns";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export const UserDashboard = () => {
  const { data: analytics } = useDashboardAnalytics();

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="grid grid-cols-12 grid-rows-4 gap-4">
      <StatCard
        className="col-span-4 row-span-1"
        icon={BanknoteArrowUp}
        showBadge
        stat={analytics.stats.CREDIT}
        title="Income"
        type={TransactionType.CREDIT}
      />
      <StatCard
        className="col-span-4 row-span-1 col-start-5"
        icon={BanknoteArrowDown}
        showBadge
        stat={analytics.stats.DEBIT}
        title="Debit"
        type={TransactionType.DEBIT}
      />
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
  );
};
