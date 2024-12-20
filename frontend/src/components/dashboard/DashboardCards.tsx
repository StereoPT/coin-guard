'use client';

import { useTransactions } from '@/hooks/useTransactions';
import { DashboardCard } from './DashboardCard';
import { useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';

const sumByType = (array: Transaction[], type: TransactionType) => {
  return array.reduce((acc, cur) => {
    if (cur.type === type) return acc + +cur.amount;
    return acc;
  }, 0);
};

export const DashboardCards = () => {
  const { data: transactions } = useTransactions();

  const statistics = useMemo(() => {
    if (!transactions) return { income: 0, expenses: 0 };
    return {
      income: sumByType(transactions, 'credit'),
      expenses: sumByType(transactions, 'debit'),
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <DashboardCard title="Income" type="credit" amount={statistics.income} />
      <DashboardCard
        title="Expenses"
        type="debit"
        amount={statistics.expenses}
      />
    </div>
  );
};
