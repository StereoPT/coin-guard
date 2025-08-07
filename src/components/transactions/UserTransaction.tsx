'use client';

import { useGetTransaction } from '@/hooks/transactions/useGetTransaction';
import { ErrorAlert } from '@/components/ErrorAlert';

import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionChart } from '@/components/transactions/TransactionChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { AmountBadge } from '@/components/AmountBadge';

const LoadingUserTransaction = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
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
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>
              {transaction.transaction.description}
            </CardDescription>
            {transaction.transaction.category && (
              <CardAction>
                <Badge variant="outline">
                  {transaction.transaction.category.name}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <AmountBadge
                  type={transaction.transaction.type}
                  amount={transaction.transaction.amount}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {format(transaction.transaction.date, 'PPP')}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>{transaction.transaction.note}</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <TransactionChart transactions={transaction.all} />
      <TransactionTable transactions={transaction.all} />
    </div>
  );
};
