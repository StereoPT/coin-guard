import TransactionsTable from '@/components/transactions/TransactionsTable';
import { getTransactions } from '@/services/transactionService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid h-screen justify-center items-center">
        <main className="min-w-[1140px]">
          <TransactionsTable />
        </main>
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
