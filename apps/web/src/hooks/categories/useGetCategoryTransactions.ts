import type { AnalyticsDateRange } from "@/lib/date";
import { getCategoryTransactionsOptions } from "@/lib/queryOptions/categories";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryTransactions = (
  categoryId: string,
  range: AnalyticsDateRange,
) => {
  return useQuery(getCategoryTransactionsOptions(categoryId, range));
};
