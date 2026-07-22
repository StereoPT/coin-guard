"use client";

import { yearlyAnalyticsAtom } from "@/store/analyticsStore";
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

const years = [...Array(3)].map((_, index) => ({
  label: format(new Date(index + 2024, 1, 1), "y"),
  value: index + 2024,
}));

export const YearlySelection = () => {
  const [selectedYear, setSelectedYear] = useAtom(yearlyAnalyticsAtom);

  return (
    <Select
      items={years}
      onValueChange={(val) => {
        if (val !== null) setSelectedYear(val);
      }}
      value={selectedYear}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Transaction Type" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
