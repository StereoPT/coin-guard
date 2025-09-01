"use client";

import { getStartEndFromMonth } from "@/lib/date";
import { Card, CardContent } from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { format } from "date-fns";
import { type Dispatch, type SetStateAction, useMemo } from "react";

const months = [...Array(12)].map((_, index) => ({
  label: format(new Date(2025, index, 1), "MMMM"),
  value: index,
}));

type MonthlySelectionProps = {
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
};

export const MonthlySelection = ({
  selectedMonth,
  setSelectedMonth,
}: MonthlySelectionProps) => {
  const startEndOfMonth = useMemo(() => {
    return getStartEndFromMonth(selectedMonth);
  }, [selectedMonth]);

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">From:</span>
            {startEndOfMonth.start}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">To:</span>
            {startEndOfMonth.end}
          </div>
        </div>
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
      </CardContent>
    </Card>
  );
};
