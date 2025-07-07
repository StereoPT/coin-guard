'use client';

import { Sigma } from 'lucide-react';
import { DisplayCard } from '@/components/DisplayCard';
import { useGetTransaction } from '@/hooks/transaction/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';

import { TransactionTable } from '@/components/transaction/TransactionTable';
import { TransactionChart } from '@/components/transaction/TransactionChart';

type UserTransactionProps = {
  transactionId: string;
};

export const UserTransaction = ({ transactionId }: UserTransactionProps) => {
  const { data: transaction, isLoading } = useGetTransaction(transactionId);

  if (isLoading) {
    return 'Loading...';
  }

  if (!transaction) {
    return <ErrorAlert />;
  }

  const sum = transaction.all.reduce((acc, t) => (acc += t.amount), 0);
  const average = sum / transaction.all.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <DisplayCard title="Sum" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {sum?.toFixed(2)}€
          </div>
        </DisplayCard>
        <DisplayCard title="Average" icon={Sigma}>
          <div className="flex gap-2 items-center text-2xl font-bold">
            {average.toFixed(2)}€
          </div>
        </DisplayCard>
      </div>
      <TransactionChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
