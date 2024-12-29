import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '../table';
import { ReactElement, useState } from 'react';
import { DataTableFilter } from './data-table-filter';
import { DataTablePaginator } from './data-table-paginator';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';

type DataTableProps<T, V> = {
  columns: ColumnDef<T, V>[];
  children?: ReactElement;
  data: T[];
  filterBy?: Extract<keyof T, string>;
};

export const DataTable = <T, V>({
  columns,
  children,
  data,
  filterBy,
}: DataTableProps<T, V>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        {filterBy && <DataTableFilter table={table} filterBy={filterBy} />}
        {children}
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody table={table} />
        </Table>
      </div>
      <DataTablePaginator table={table} showPreviousNext />
    </div>
  );
};
