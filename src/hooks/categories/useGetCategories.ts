import { GetCategories } from '@/actions/categories/getCategories';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => GetCategories(),
  });
};
