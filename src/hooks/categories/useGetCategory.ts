import { getCategoryOptions } from "@/lib/queryOptions/categories";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id: string) => {
  return useQuery(getCategoryOptions(id));
};
