'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DataTable } from '../ui/data-table/index';
import { transactionColumns } from '@/lib/transaction-columns';
import { getMonth, subMonths } from 'date-fns';

export const DashboardTable = () => {
  const lastMonth = getMonth(subMonths(new Date(), 1)) + 1;
  const { data: transactions } = useTransactions({ month: lastMonth });

  return (
    <DataTable
      data={transactions ?? []}
      columns={transactionColumns}
      filterBy="description"
    />
  );
};
