import type { DateRange } from "@/lib/date";
import { getCategoryTransactionsOptions } from "@/lib/queryOptions/categories";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryTransactions = (
  categoryId: string,
  range: DateRange,
) => {
  return useQuery(getCategoryTransactionsOptions(categoryId, range));
};
