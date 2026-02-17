"use client";

import { StatCards } from "@/components/analytics/StatCards";
import { YearlySelection } from "@/components/analytics/YearlySelection";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { YearlyBarChart } from "@/components/charts/YearlyBarChart";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useYearlyAnalytics } from "@/hooks/analytics/useYearlyAnalytics";
import { useState } from "react";

type UserYearlyAnalyticsProps = {
  year: number;
};

export const UserYearlyAnalytics = ({ year }: UserYearlyAnalyticsProps) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const { data: analytics, isLoading } = useYearlyAnalytics(selectedYear);

  if (!analytics && !isLoading) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <YearlySelection
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <StatCards stats={analytics?.stats} />
      <div className="grid grid-cols-3 gap-4">
        <YearlyBarChart
          selectedYear={selectedYear}
          transactions={analytics?.transactions}
        />
        <CategoryPieChart
          categoryStats={analytics?.categoryStats}
          description={`For the year of: ${selectedYear}`}
          title="Category Summary"
        />
      </div>
    </div>
  );
};
