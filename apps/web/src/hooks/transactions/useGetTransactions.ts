import { getTransactionsOptions } from "@/lib/queryOptions/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery(getTransactionsOptions());
};
