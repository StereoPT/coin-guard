'use client';

import { DataTable } from '@/components/DataTable';
import { ErrorAlert } from '@/components/ErrorAlert';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { columns } from '@/components/transactions/columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTransactions } from '@/hooks/transactions/useGetTransactions';
import { fuzzyFilterFn } from '@/lib/dataTable';
import { ArrowLeftRight } from 'lucide-react';

const LoadingUserTransactions = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9 w-1/2" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
};

const EmptyUserTransactions = () => {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
        <ArrowLeftRight size={40} className="stroke-primary" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No transactions added yet</p>
        <p className="text-muted-foreground">
          Click the button below to add your first transaction
        </p>
      </div>
      <AddTransactionDialog />
    </div>
  );
};

export const UserTransactions = () => {
  const { data: transactions, isLoading } = useGetTransactions();

  if (isLoading) {
    return <LoadingUserTransactions />;
  }

  if (!transactions) {
    return <ErrorAlert />;
  }

  if (transactions.length <= 0) {
    return <EmptyUserTransactions />;
  }

  return (
    <DataTable
      columns={columns}
      data={transactions}
      config={{
        filters: {
          search: {
            filterFn: fuzzyFilterFn(['description']),
            placeholder: 'Search transactions...',
          },
          filter: [
            {
              column: 'date',
              type: 'date',
            },
            {
              column: 'type',
              type: 'select',
            },
          ],
        },
        columnVisibility: {
          type: false,
        },
      }}
    />
  );
};
