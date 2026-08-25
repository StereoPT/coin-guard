import { GetCategories } from "@/actions/categories/GetCategories";
import { GetCategory } from "@/actions/categories/GetCategory";
import { GetCategoryTransactions } from "@/actions/categories/GetCategoryTransactions";
import { KEYS } from "@/constants/queryKeys";
import type { DateRange } from "@/lib/date";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const getCategoriesOptions = () => {
  return queryOptions({
    queryKey: KEYS.categories,
    queryFn: () => GetCategories(),
    throwOnError: true,
  });
};

export const getCategoryOptions = (categoryId: string) => {
  return queryOptions({
    queryKey: KEYS.category(categoryId),
    queryFn: () => GetCategory(categoryId),
    throwOnError: true,
  });
};

export const getCategoryTransactionsOptions = (
  categoryId: string,
  range: DateRange,
) => {
  return queryOptions({
    queryKey: KEYS.categoryTransactions(categoryId, range),
    queryFn: () => GetCategoryTransactions(categoryId, range),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });
};
