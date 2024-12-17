import TransactionsTable from '@/components/transactions/TransactionsTable';
import { TRANSACTIONS_KEY } from '@/constants/query-keys';
import { getTransactions } from '@/services/transactionService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const TransactionsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [TRANSACTIONS_KEY],
    queryFn: () => getTransactions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-8 py-4">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>
      <div className="grid justify-center items-center">
        <div className="container min-w-[940px] mx-auto py-10">
          <TransactionsTable />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionsPage;
