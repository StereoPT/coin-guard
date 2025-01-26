import { fetcher, FetcherOptions } from '@/lib/fetcher';
import { CATEGORIES_URL } from '@/constants/api-routes';
import { Category } from '@/types/category';

export const getCategories = (options?: FetcherOptions) => {
  return fetcher<Category[]>(CATEGORIES_URL, options);
};
