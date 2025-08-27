import type { FilterFn, FilterMeta, Row } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

export const fuzzyFilterFn =
  <TData>(searchableColumns?: (keyof TData)[]) =>
  (
    row: Row<TData>,
    columnId: string,
    filterValue: string,
    addMeta: (meta: FilterMeta) => void,
  ) => {
    if (!searchableColumns) return false;
    if (!searchableColumns.includes(columnId as keyof TData)) return false;

    const itemRank = rankItem(row.getValue(columnId), filterValue);

    addMeta({ itemRank });

    return itemRank.passed;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const date = row.getValue(columnId) as Date;
  const { from: start, to: end } = value;

  return isWithinInterval(date, {
    start: startOfDay(start),
    end: endOfDay(end),
  });
};
