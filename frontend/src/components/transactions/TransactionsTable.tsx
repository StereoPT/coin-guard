'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';
import { formatCurrentyColumn } from '@/lib/column-formatter';

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'debit',
    header: () => <div className="text-right">Debit</div>,
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'debit'),
  },
  {
    accessorKey: 'credit',
    header: () => <div className="text-right">Credit</div>,
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'credit'),
  },
  {
    accessorKey: 'balance',
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => formatCurrentyColumn<Transaction>(row, 'balance'),
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useTransactions();

  return <DataTable data={transactions ?? []} columns={transactionColumns} />;
};

export default TransactionsTable;
