import { GetRelatedTransactions } from "@/actions/transactions/GetRelatedTransactions";
import { GetTransaction } from "@/actions/transactions/GetTransaction";
import { GetTransactions } from "@/actions/transactions/GetTransactions";
import { KEYS } from "@/constants/queryKeys";
import type { DateRange } from "@/lib/date";
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

export const getRelatedTransactionsOptions = (
  description: string,
  range: DateRange,
) => {
  return queryOptions({
    queryKey: KEYS.relatedTransactions(description, range),
    queryFn: () => GetRelatedTransactions(description, range),
    enabled: description.length > 0,
  });
};
