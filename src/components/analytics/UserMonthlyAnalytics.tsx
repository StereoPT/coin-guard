"use client";

import { MonthlyChart } from "@/components/analytics/MonthlyChart";
import { MonthlySelection } from "@/components/analytics/MonthlySelection";
import { MonthlyStats } from "@/components/analytics/MonthlyStats";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useMonthlyAnalytics } from "@/hooks/analytics/useMonthlyAnalytics";
import { useState } from "react";

type UserMonthlyAnalyticsProps = {
  month: number;
};

export const UserMonthlyAnalytics = ({ month }: UserMonthlyAnalyticsProps) => {
  const [selectedMonth, setSelectedMonth] = useState(month);
  const { data: analytics, isLoading } = useMonthlyAnalytics(selectedMonth);

  if (!analytics && !isLoading) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <MonthlySelection
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MonthlyStats stats={analytics?.stats} />
      <div className="grid grid-cols-3 gap-4">
        <MonthlyChart
          selectedMonth={selectedMonth}
          transactions={analytics?.transactions}
        />
        <CategoryPieChart
          categoryStats={analytics?.categoryStats}
          hasHeader={false}
        />
      </div>
    </div>
  );
};
