'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';

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
    header: 'Debit',
  },
  {
    accessorKey: 'credit',
    header: 'Credit',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useTransactions();

  return <DataTable data={transactions ?? []} columns={transactionColumns} />;
};

export default TransactionsTable;
