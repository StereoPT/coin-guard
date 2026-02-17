import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery(getCategoriesOptions());
};
