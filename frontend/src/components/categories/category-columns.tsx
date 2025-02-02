import { Category } from '@/types/category';
import { ColumnDef } from '@tanstack/react-table';
import { ColorBadge } from './ColorBadge';

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const { color } = row.original;
      return <ColorBadge color={color} />;
    },
  },
];
