'use client';

import { CategoryActions } from '@/components/categories/CategoryActions';
import { ROUTES } from '@/constants/routes';
import { Category } from '@/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 620,
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <Link href={ROUTES.category(id)}>
          <div className="font-medium">{name}</div>
        </Link>
      );
    },
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
