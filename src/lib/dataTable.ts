import { FilterMeta, Row } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

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
