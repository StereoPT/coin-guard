import { GetCategories } from "@/actions/categories/GetCategories";
import { GetCategory } from "@/actions/categories/GetCategory";
import { GetCategoryTransactions } from "@/actions/categories/GetCategoryTransactions";
import { KEYS } from "@/constants/queryKeys";
import type { DateRange } from "@/lib/date";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesOptions = () => {
  return queryOptions({
    queryKey: KEYS.categories,
    queryFn: () => GetCategories(),
  });
};

export const getCategoryOptions = (categoryId: string) => {
  return queryOptions({
    queryKey: KEYS.category(categoryId),
    queryFn: () => GetCategory(categoryId),
  });
};

export const getCategoryTransactionsOptions = (
  categoryId: string,
  range: DateRange,
) => {
  return queryOptions({
    queryKey: KEYS.categoryTransactions(categoryId, range),
    queryFn: () => GetCategoryTransactions(categoryId, range),
  });
};
