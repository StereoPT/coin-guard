import { GetCategory } from '@/actions/categories/getCategory';
import { KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: KEYS.category(id),
    queryFn: () => GetCategory(id),
  });
};
