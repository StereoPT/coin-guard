import { GetTransaction } from "@/actions/transactions/getTransaction";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: KEYS.transaction(id),
    queryFn: () => GetTransaction(id),
  });
};
