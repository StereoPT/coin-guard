"use client";

import {
  DataTableFilters,
  type Filters,
} from "@/components/dataTable/DataTableFilters";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

type ColumnVisibility<TData> = {
  [K in keyof TData]?: boolean;
} & Record<string, boolean>;

export interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  render: (index: string, item: TData) => ReactNode;
  config?: {
    filters?: Filters<TData>;
    columnVisibility?: ColumnVisibility<TData>;
  };
}

export const DataGrid = <TData, TValue>({
  columns,
  render,
  data,
  config,
}: DataGridProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: config?.filters?.search?.filterFn,
    autoResetPageIndex: false,
    initialState: {
      columnVisibility: config?.columnVisibility,
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <DataTableFilters filters={config?.filters} table={table} />
      {table.getRowModel().rows?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {table.getRowModel().rows.map((row) => render(row.id, row.original))}
        </div>
      ) : (
        <div className="py-4">
          <Card className="max-w-xl mx-auto">
            <CardContent className="text-center">No results.</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
