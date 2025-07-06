import { GetTransactions } from '@/actions/transactions/getTransactions';
import { useQuery } from '@tanstack/react-query';

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => GetTransactions(),
  });
};
