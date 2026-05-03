import { getTransactionOptions } from "@/lib/queryOptions/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (transactionId: string) => {
  return useQuery(getTransactionOptions(transactionId));
};
