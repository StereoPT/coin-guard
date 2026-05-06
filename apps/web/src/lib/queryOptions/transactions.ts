import { GetTransaction } from "@/actions/transactions/GetTransaction";
import { GetTransactions } from "@/actions/transactions/GetTransactions";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getTransactionsOptions = () => {
  return queryOptions({
    queryKey: KEYS.transactions,
    queryFn: () => GetTransactions(),
  });
};

export const getTransactionOptions = (transactionId: string) => {
  return queryOptions({
    queryKey: KEYS.transaction(transactionId),
    queryFn: () => GetTransaction(transactionId),
  });
};
