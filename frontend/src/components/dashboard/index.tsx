'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { getMonth, subMonths } from 'date-fns';
import { TransactionCards } from '../transactions/TransactionCards';
import { DashboardTable } from './DashboardTable';

export const Dashboard = () => {
  const lastMonth = getMonth(subMonths(new Date(), 1)) + 1;
  const { data: transactions } = useTransactions({ month: lastMonth });

  // XXX: Loading Here?
  if (!transactions) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-3xl font-bold tracking-tight">
        👋 Welcome, Guido Pereira
      </h2>
      <TransactionCards transactions={transactions} />
      <DashboardTable transactions={transactions} />
    </div>
  );
};
