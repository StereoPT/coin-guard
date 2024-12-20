import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/services/transactionService';
import { TRANSACTIONS_KEY } from '@/constants/query-keys';

type UseTransactionsArgs = {
  month?: number;
};

export const useTransactions = ({ month }: UseTransactionsArgs = {}) => {
  return useQuery({
    queryKey: [TRANSACTIONS_KEY, month],
    queryFn: () => getTransactions({ month }),
  });
};
