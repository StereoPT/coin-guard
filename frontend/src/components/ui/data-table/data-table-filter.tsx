import { Table } from '@tanstack/react-table';
import { Input } from '../input';

type DataTableFilterProps<T> = {
  table: Table<T>;
  filterBy: string;
};

export const DataTableFilter = <T,>({
  table,
  filterBy,
}: DataTableFilterProps<T>) => {
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
