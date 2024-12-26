'use client';
import { useState } from 'react';

import { useTransactions } from '@/hooks/useTransactions';
import { TransactionCards } from '../transactions/TransactionCards';
import { TransactionsTable } from './TransactionsTable';
import { getLastMonth } from '@/lib/dates';

export const Transactions = () => {
  const lastMonth = getLastMonth();
  const [selectedMonth, setSelectedMonth] = useState<number>(lastMonth);
  const { data: transactions } = useTransactions({ month: selectedMonth });

  // XXX: Loading Here?
  if (!transactions) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      <TransactionCards transactions={transactions} />
      <TransactionsTable
        transactions={transactions}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
};
