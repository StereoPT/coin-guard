'use client';

import { useGetTransaction } from '@/hooks/transaction/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';

import { TransactionTable } from '@/components/transaction/TransactionTable';
import { TransactionChart } from '@/components/transaction/TransactionChart';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingUserTransaction = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-7 w-1/2" />
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-[420px] w-full" />
        ))}
      </div>
    </div>
  );
};

type UserTransactionProps = {
  transactionId: string;
};

export const UserTransaction = ({ transactionId }: UserTransactionProps) => {
  const { data: transaction, isLoading } = useGetTransaction(transactionId);

  if (isLoading) {
    return <LoadingUserTransaction />;
  }

  if (!transaction) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl">
        <span className="font-bold">Transaction: </span>
        {transaction.transaction.description}
      </div>
      <TransactionChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
