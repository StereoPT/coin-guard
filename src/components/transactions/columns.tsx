'use client';

import { AmountBadge } from '@/components/AmountBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/formatter';
import { addTransactionSchemaType } from '@/schemas/transactions';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<addTransactionSchemaType>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    size: 110,
    cell: ({ row }) => {
      const { date } = row.original;
      return format(date, 'PPP');
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 250,
  },
  {
    accessorKey: 'type',
    meta: {
      visible: false,
    },
  },
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
    accessorKey: '',
    header: 'Actions',
    size: 50,
    cell: () => {
      // const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
