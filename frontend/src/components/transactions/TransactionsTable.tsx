'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';
import { formatCurrentyColumn } from '@/lib/column-formatter';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'debit',
    header: ({ column }) => {
      return (
        <Button
          className="float-right"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Debit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'debit'),
  },
  {
    accessorKey: 'credit',
    header: ({ column }) => {
      return (
        <Button
          className="float-right"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Credit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'credit'),
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => {
      return (
        <Button
          className="float-right"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'balance'),
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useTransactions();

  return (
    <DataTable
      data={transactions ?? []}
      columns={transactionColumns}
      filterBy="description"
    />
  );
};

export default TransactionsTable;
