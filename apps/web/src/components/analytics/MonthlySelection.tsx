"use client";

import { monthlyAnalyticsAtom } from "@/store/analyticsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@coin-guard/ui";
import { format } from "date-fns";
import { useAtom } from "jotai";

const months = [...Array(12)].map((_, index) => ({
  label: format(new Date(2026, index, 1), "MMMM"),
  value: index,
}));

export const MonthlySelection = () => {
  const [selectedMonth, setSelectedMonth] = useAtom(monthlyAnalyticsAtom);

  return (
    <Select
      defaultValue={selectedMonth.toString()}
      onValueChange={(val) => {
        setSelectedMonth(Number(val));
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Transaction Type" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value.toString()}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
