import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/services/transactionService';
import KEYS from '@/constants/query-keys';

type UseTransactionsArgs = {
  month: number;
};

export const useTransactions = ({ month }: UseTransactionsArgs) => {
  return useQuery({
    queryKey: KEYS.Transactions(month),
    queryFn: () => getTransactions({ month }),
  });
};
