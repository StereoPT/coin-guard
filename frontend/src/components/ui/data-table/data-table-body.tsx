import { flexRender, Table } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '../table';

type DataTableBodyProps<T> = {
  table: Table<T>;
};

export const DataTableBody = <T,>({ table }: DataTableBodyProps<T>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center">
            No Results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
