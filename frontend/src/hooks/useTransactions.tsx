import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/services/transactionService';
import { TRANSACTIONS_KEY } from '@/constants/query-keys';

export const useTransactions = () => {
  return useQuery({
    queryKey: [TRANSACTIONS_KEY],
    queryFn: getTransactions,
  });
};
