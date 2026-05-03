import { getLookupCategoriesOptions } from "@/lib/queryOptions/lookup";
import { useQuery } from "@tanstack/react-query";

export const useGetLookupCategories = () => {
  return useQuery(getLookupCategoriesOptions());
};
