'use client';

import { AmountBadge } from '@/components/AmountBadge';
import { TransactionActions } from '@/components/transactions/TransactionActions';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';
import { dateBetweenFilterFn } from '@/lib/dataTable';
import { formatCurrency } from '@/lib/formatter';
import { TransactionWithCategory } from '@/types/transactions';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const columns: ColumnDef<TransactionWithCategory>[] = [
  {
    accessorKey: 'date',
    filterFn: dateBetweenFilterFn,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 350,
    cell: ({ row }) => {
      const { id, description, date } = row.original;

      return (
        <Link href={ROUTES.transaction(id)}>
          <div className="flex flex-col">
            <div className="font-medium">{description}</div>
            <div className="text-xs text-muted-foreground">
              {format(date, 'PPP')}
            </div>
          </div>
        </Link>
      );
    },
  },
  { accessorKey: 'type' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    size: 90,
    cell: ({ row }) => {
      const { type, amount } = row.original;

      return <AmountBadge amount={amount} type={type} />;
    },
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    size: 90,
    cell: ({ row }) => {
      const { balance } = row.original;

      return formatCurrency(balance);
    },
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
    size: 90,
    cell: ({ row }) => {
      const { category } = row.original;

      return category && <Badge variant="outline">{category.name}</Badge>;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      const transaction = row.original;

      return <TransactionActions transaction={transaction} />;
    },
  },
];
