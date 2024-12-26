import { TransactionCard } from './TransactionCard';
import { useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';

const sumByType = (array: Transaction[], type: TransactionType) => {
  return array.reduce((acc, cur) => {
    if (cur.type === type) return acc + +cur.amount;
    return acc;
  }, 0);
};

type TransactionCardsProps = {
  transactions: Transaction[];
};

export const TransactionCards = ({ transactions }: TransactionCardsProps) => {
  const statistics = useMemo(() => {
    if (!transactions) return { income: 0, expenses: 0 };
    return {
      income: sumByType(transactions, 'credit'),
      expenses: sumByType(transactions, 'debit'),
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <TransactionCard
        title="Income"
        type="credit"
        amount={statistics.income}
      />
      <TransactionCard
        title="Expenses"
        type="debit"
        amount={statistics.expenses}
      />
    </div>
  );
};
