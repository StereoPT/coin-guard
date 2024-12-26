import { TRANSACTIONS_KEY } from '@/constants/query-keys';
import { getTransactions } from '@/services/transactionService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Transactions } from '@/components/transactions';
import { getLastMonth } from '@/lib/dates';

const TransactionsPage = async () => {
  const lastMonth = getLastMonth();
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
