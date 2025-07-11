'use client';

import { CategoryActions } from '@/components/categories/CategoryActions';
import { Category } from '@/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 110,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return <CategoryActions category={category} />;
    },
  },
];
