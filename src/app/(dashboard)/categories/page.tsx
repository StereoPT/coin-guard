import { GetCategories } from '@/actions/categories/getCategories';
import { AddCategoryDialog } from '@/components/categories/AddCategoryDialog';
import { UserCategories } from '@/components/categories/UserCategories';
import { PageHeader } from '@/components/PageHeader';
import { KEYS } from '@/constants/queryKeys';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const CategoriesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.categories,
    queryFn: () => GetCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader title="Categories" description="Categories overview" />
          <AddCategoryDialog />
        </div>

        <div className="h-full py-6">
          <UserCategories />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
