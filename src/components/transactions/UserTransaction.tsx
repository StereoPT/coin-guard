'use client';

import { useGetTransaction } from '@/hooks/transactions/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';

import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionChart } from '@/components/transactions/TransactionChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex text-xl gap-2 items-center">
        <span className="font-bold">Transaction: </span>
        {transaction.transaction.description}
        {transaction.transaction.category && (
          <Badge variant="outline">
            {transaction.transaction.category.name}
          </Badge>
        )}
      </div>
      <TransactionChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
