import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../table';

type DataTableHeaderProps<T> = {
  headerGroups: HeaderGroup<T>[];
};

export const DataTableHeader = <T,>({
  headerGroups,
}: DataTableHeaderProps<T>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
