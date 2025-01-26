import KEYS from '@/constants/query-keys';
import { getCategories } from '@/services/categoryService';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Categories } from '@/components/categories';

const CategoriesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: KEYS.Categories,
    queryFn: () => getCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Categories />
    </HydrationBoundary>
  );
};

export default CategoriesPage;
