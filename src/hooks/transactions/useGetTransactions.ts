import { GetTransactions } from '@/actions/transactions/getTransactions';
import { KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetTransactions = () => {
  return useQuery({
    queryKey: KEYS.transactions,
    queryFn: () => GetTransactions(),
  });
};
