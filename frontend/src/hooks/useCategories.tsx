import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/services/categoryService';
import KEYS from '@/constants/query-keys';

export const useCategories = () => {
  return useQuery({
    queryKey: KEYS.Categories,
    queryFn: () => getCategories(),
  });
};
