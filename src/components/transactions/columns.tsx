'use client';

import { AmountBadge } from '@/components/AmountBadge';
import { TransactionActions } from '@/components/transactions/TransactionActions';
import { Badge } from '@/components/ui/badge';
import { dateBetweenFilterFn } from '@/lib/dataTable';
import { formatCurrency } from '@/lib/formatter';
import { TransactionWithCategory } from '@/types/transactions';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<TransactionWithCategory>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    size: 110,
    cell: ({ row }) => {
      const { date } = row.original;
      return format(date, 'PPP');
    },
    filterFn: dateBetweenFilterFn,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 250,
  },
  { accessorKey: 'type' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    size: 110,
    cell: ({ row }) => {
      const { type, amount } = row.original;

      return <AmountBadge amount={amount} type={type} />;
    },
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    size: 110,
    cell: ({ row }) => {
      const { balance } = row.original;

      return formatCurrency(balance);
    },
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
    size: 110,
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
