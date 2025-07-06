import { DateFilter } from '@/components/filters/DateFilter';
import { SelectFilter } from '@/components/filters/SelectFilter';
import { Table } from '@tanstack/react-table';

export type Filter<TData> = {
  column: keyof TData;
  type: 'select' | 'date';
};

type DataTableFilterProps<TData> = {
  table: Table<TData>;
  filter: Filter<TData>;
};

export const DataTableFilter = <TData,>({
  table,
  filter,
}: DataTableFilterProps<TData>) => {
  switch (filter.type) {
    case 'select': {
      return <SelectFilter column={filter.column} table={table} />;
    }
    case 'date': {
      return <DateFilter column={filter.column} table={table} />;
    }
    default:
      throw new Error('Type not Implemented', filter.type);
  }
};
