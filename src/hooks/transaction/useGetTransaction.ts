import { GetTransaction } from '@/actions/transaction/getTransaction';
import { useQuery } from '@tanstack/react-query';

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => GetTransaction(id),
  });
};
