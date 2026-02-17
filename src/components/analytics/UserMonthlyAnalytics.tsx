"use client";

import { MonthlySelection } from "@/components/analytics/MonthlySelection";
import { StatCards } from "@/components/analytics/StatCards";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { MonthlyAreaChart } from "@/components/charts/MonthlyAreaChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useMonthlyAnalytics } from "@/hooks/analytics/useMonthlyAnalytics";
import { format } from "date-fns";
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
      <StatCards stats={analytics?.stats} />
      <div className="grid grid-cols-3 gap-4">
        <MonthlyAreaChart
          selectedMonth={selectedMonth}
          transactions={analytics?.transactions}
        />
        <CategoryPieChart
          categoryStats={analytics?.categoryStats}
          description={`For the month of: ${format(new Date(2026, selectedMonth, 1), "MMMM")}`}
          title="Category Summary"
        />
      </div>
    </div>
  );
};
