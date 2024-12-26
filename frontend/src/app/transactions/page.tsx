import { TRANSACTIONS_KEY } from '@/constants/query-keys';
import { getTransactions } from '@/services/transactionService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getMonth, subMonths } from 'date-fns';
import { Transactions } from '@/components/transactions';

const TransactionsPage = async () => {
  const lastMonth = getMonth(subMonths(new Date(), 1)) + 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [TRANSACTIONS_KEY, lastMonth],
    queryFn: () => getTransactions({ month: lastMonth }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Transactions />
    </HydrationBoundary>
  );
};

export default TransactionsPage;
