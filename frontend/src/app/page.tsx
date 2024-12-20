import { TransactionCards } from '@/components/transactions/TransactionCards';
import { DashboardTable } from '@/components/transactions/DashboardTable';
import { TRANSACTIONS_KEY } from '@/constants/query-keys';
import { getTransactions } from '@/services/transactionService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getMonth, subMonths } from 'date-fns';

const DashboardPage = async () => {
  const lastMonth = getMonth(subMonths(new Date(), 1)) + 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [TRANSACTIONS_KEY],
    queryFn: () => getTransactions({ month: lastMonth }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h2 className="text-3xl font-bold tracking-tight">
          👋 Welcome, Guido Pereira
        </h2>
        <TransactionCards />
        <DashboardTable />
      </div>
    </HydrationBoundary>
  );
};

export default DashboardPage;
