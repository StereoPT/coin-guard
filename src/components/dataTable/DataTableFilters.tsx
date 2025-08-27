import {
  DataTableFilter,
  type Filter,
} from "@/components/dataTable/DataTableFilter";
import { Input } from "@/components/ui/input";
import type { FilterFn, Table } from "@tanstack/react-table";

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
  const value = table.getState().globalFilter ?? "";
  const setValue = table.setGlobalFilter;

  if (!filters) return null;

  return (
    <div className="flex items-center gap-4 pb-4">
      {filters.search && (
        <Input
          className="max-w-sm"
          onChange={(event) => setValue(() => event.target.value)}
          placeholder={filters.search?.placeholder}
          value={value}
        />
      )}
      {filters.filter &&
        filters.filter.map((filter) => {
          return (
            <DataTableFilter
              filter={filter}
              key={filter.column.toString()}
              table={table}
            />
          );
        })}
    </div>
  );
};
