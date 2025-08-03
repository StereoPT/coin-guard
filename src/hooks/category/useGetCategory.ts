import { GetCategory } from '@/actions/category/getCategory';
import { useQuery } from '@tanstack/react-query';

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => GetCategory(id),
  });
};
