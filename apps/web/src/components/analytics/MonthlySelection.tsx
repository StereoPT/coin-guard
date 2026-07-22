"use client";

import { monthlyAnalyticsAtom } from "@/store/analyticsStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
      items={months}
      onValueChange={(val) => {
        if (val !== null) setSelectedMonth(val);
      }}
      value={selectedMonth}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Transaction Type" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
