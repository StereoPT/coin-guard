import { EditCategoryDialog } from "@/components/categories/EditCategoryDialog";
import { UserCategory } from "@/components/categories/UserCategory";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoryOptions } from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CategoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoryOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader goBack title="Category Details" />
          <EditCategoryDialog id={id} trigger />
        </div>
        <div className="h-full py-6">
          <UserCategory categoryId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryDetailsPage;
