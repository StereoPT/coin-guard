"use client";

import { yearlyAnalyticsAtom } from "@/store/analyticsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@coin-guard/ui";
import { format } from "date-fns";
import { useAtom } from "jotai";

const years = [...Array(3)].map((_, index) => ({
  label: format(new Date(index + 2024, 1, 1), "y"),
  value: index + 2024,
}));

export const YearlySelection = () => {
  const [selectedYear, setSelectedYear] = useAtom(yearlyAnalyticsAtom);

  return (
    <Select
      defaultValue={selectedYear.toString()}
      onValueChange={(val) => {
        setSelectedYear(Number(val));
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Transaction Type" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year.value} value={year.value.toString()}>
            {year.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
