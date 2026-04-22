import type { FilterFn } from "@tanstack/react-table";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

// biome-ignore lint/suspicious/noExplicitAny: leftover from migration
export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const date = row.getValue(columnId) as Date;
  const { from: start, to: end } = value;

  return isWithinInterval(date, {
    start: startOfDay(start),
    end: endOfDay(end),
  });
};
