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
    queryFn: getTransactions,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Transactions</div>
      <div className="grid h-screen justify-center items-center">
        <div className="container min-w-[940px] mx-auto py-10">
          <TransactionsTable />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default TransactionsPage;
