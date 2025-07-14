'use client';

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

  return (
    <div className="flex flex-col gap-4">
      <TransactionChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
