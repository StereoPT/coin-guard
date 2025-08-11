import { GetCategory } from '@/actions/categories/getCategory';
import { EditCategoryDialog } from '@/components/categories/EditCategoryDialog';
import { UserCategory } from '@/components/categories/UserCategory';
import { PageHeader } from '@/components/PageHeader';
import { KEYS } from '@/constants/queryKeys';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type CategoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.category(id),
    queryFn: () => GetCategory(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader title="Category Details" goBack />
          <EditCategoryDialog trigger id={id} />
        </div>
        <div className="h-full py-6">
          <UserCategory categoryId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryDetailsPage;
