import { GetTransactions } from '@/actions/transactions/getTransactions';
import { PageHeader } from '@/components/PageHeader';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { UserTransactions } from '@/components/transactions/UserTransactions';
import { KEYS } from '@/constants/queryKeys';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const TransactionsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.transactions,
    queryFn: () => GetTransactions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            title="Transactions"
            description="Transactions overview"
          />
          <AddTransactionDialog />
        </div>

        <div className="h-full py-6">
          <UserTransactions />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionsPage;
