import type { AnalyticsDateRange } from "@/lib/date";
import { getRelatedTransactionsOptions } from "@/lib/queryOptions/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetRelatedTransactions = (
  description: string,
  range: AnalyticsDateRange,
) => {
  return useQuery(getRelatedTransactionsOptions(description, range));
};
