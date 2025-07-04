import { DataTableFilter, Filter } from '@/components/DataTableFilter';
import { Input } from '@/components/ui/input';
import { FilterFn, Table } from '@tanstack/react-table';

export type Filters<TData> = {
  search?: {
    filterFn: FilterFn<TData>;
    placeholder: string;
  };
  filter?: Filter<TData>[];
};

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  filters?: Filters<TData>;
}

export const DataTableFilters = <TData,>({
  table,
  filters,
}: DataTableFiltersProps<TData>) => {
  const value = table.getState().globalFilter ?? '';
  const setValue = table.setGlobalFilter;

  if (!filters) return null;

  return (
    <div className="flex items-center gap-4 pb-4">
      {filters.search && (
        <Input
          className="max-w-sm"
          value={value}
          onChange={(event) => setValue(() => event.target.value)}
          placeholder={filters.search?.placeholder}
        />
      )}
      {filters.filter &&
        filters.filter.map((filter) => {
          return (
            <DataTableFilter
              key={filter.column.toString()}
              table={table}
              filter={filter}
            />
          );
        })}
    </div>
  );
};
