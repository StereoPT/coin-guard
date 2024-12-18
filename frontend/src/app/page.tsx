import { DashboardCards } from '@/components/dashboard/DashboardCards';
import TransactionsTable from '@/components/transactions/TransactionsTable';
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
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DashboardCards />
        <div className="grid justify-center items-center">
          <div className="container min-w-[940px] mx-auto py-10">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default DashboardPage;
