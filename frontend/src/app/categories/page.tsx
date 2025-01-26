import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Categories } from '@/components/categories';

const CategoriesPage = async () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Categories />
    </HydrationBoundary>
  );
};

export default CategoriesPage;
