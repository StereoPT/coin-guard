"use client";

import { getStartEndFromYear } from "@/lib/date";
import { Card, CardContent } from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { format } from "date-fns";
import { useMemo, type Dispatch, type SetStateAction } from "react";

const years = [...Array(2)].map((_, index) => ({
  label: format(new Date(index + 2024, 1, 1), "y"),
  value: index + 2024,
}));

type YearlySelectionProps = {
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
};

export const YearlySelection = ({
  selectedYear,
  setSelectedYear,
}: YearlySelectionProps) => {
  const startEndOfYear = useMemo(() => {
    return getStartEndFromYear(selectedYear);
  }, [selectedYear]);

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">From:</span>
            {startEndOfYear.start}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">To:</span>
            {startEndOfYear.end}
          </div>
        </div>
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
      </CardContent>
    </Card>
  );
};
