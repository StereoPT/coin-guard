import { getTransactionOptions } from "@/lib/queryOptions/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id: string) => {
  return useQuery(getTransactionOptions(id));
};
