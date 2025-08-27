import { GetCategories } from "@/actions/categories/getCategories";
import { KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: KEYS.categories,
    queryFn: () => GetCategories(),
  });
};
