import { GetLookupCategories } from "@/actions/etl/categories/getLookupCategories";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getLookupCategoriesOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupCategories,
    queryFn: () => GetLookupCategories(),
  });
};
