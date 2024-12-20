import { Table } from '@tanstack/react-table';
import { Input } from './input';

type DataTableFilterProps<TData> = {
  table: Table<TData>;
  filterBy: string;
};

export const DataTableFilter = <TData,>({
  table,
  filterBy,
}: DataTableFilterProps<TData>) => {
  return (
    <div className="flex items-center w-full">
      <Input
        placeholder={`Filter ${filterBy}...`}
        className="max-w-sm"
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(filterBy)?.setFilterValue(event.target.value)
        }
      />
    </div>
  );
};
