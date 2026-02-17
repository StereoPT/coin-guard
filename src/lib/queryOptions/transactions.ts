import { GetTransaction } from "@/actions/transactions/getTransaction";
import { GetTransactions } from "@/actions/transactions/getTransactions";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getTransactionsOptions = () => {
  return queryOptions({
    queryKey: KEYS.transactions,
    queryFn: () => GetTransactions(),
  });
};

export const getTransactionOptions = (id: string) => {
  return queryOptions({
    queryKey: KEYS.transaction(id),
    queryFn: () => GetTransaction(id),
  });
};
