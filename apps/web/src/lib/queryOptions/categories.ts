import { GetCategories } from "@/actions/categories/getCategories";
import { GetCategory } from "@/actions/categories/getCategory";
import { KEYS } from "@/constants/queryKeys";
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
