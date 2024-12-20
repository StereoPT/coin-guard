'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/formatter';
import { AmountBadge } from './AmountBadge';
import { transactionColumns } from '@/lib/transaction-columns';

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
