'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/formatter';
import { AmountBadge } from './AmountBadge';

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
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const { type } = row.original;
      const amount = parseFloat(row.getValue('amount'));

      return (
        <AmountBadge amount={amount} className="float-right" type={type} />
      );
    },
  },
  {
    accessorKey: 'balance',
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('balance'));

      return (
        <div className="text-right font-medium float-right">
          {formatCurrency(amount)}
        </div>
      );
    },
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
