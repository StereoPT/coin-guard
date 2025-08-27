import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

type DateFilterProps<TData> = {
  column: keyof TData;
  table: Table<TData>;
};

export const DateFilter = <TData,>({
  column,
  table,
}: DateFilterProps<TData>) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const columnDef = table.getColumn(column as string);

  const hasFilter = columnDef?.getFilterValue();
  const filterText =
    hasFilter && dateRange && dateRange.from && dateRange.to
      ? `${format(dateRange.from, "P", {
          locale: pt,
        })} - ${format(dateRange.to, "P", {
          locale: pt,
        })}`
      : column.toString();

  useEffect(() => {
    columnDef?.setFilterValue(dateRange);
  }, [columnDef, dateRange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-56 justify-between font-normal capitalize"
          variant="outline"
        >
          {filterText}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="rounded-lg border shadow-sm"
          mode="range"
          onSelect={setDateRange}
          selected={dateRange}
        />
      </PopoverContent>
    </Popover>
  );
};
