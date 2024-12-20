'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table';
import { transactionColumns } from '@/lib/transaction-columns';

export const DashboardTable = () => {
  const { data: transactions } = useTransactions();

  return (
    <DataTable
      data={transactions ?? []}
      columns={transactionColumns}
      filterBy="description"
    />
  );
};
