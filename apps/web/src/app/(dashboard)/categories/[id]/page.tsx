import { CategoryDetails } from "@/components/categories/CategoryDetails";
import { EditCategory } from "@/components/categories/EditCategory";
import { PageHeader } from "@/components/PageHeader";
import { getLastMonthRange } from "@/lib/date";
import { getQueryClient } from "@/lib/getQueryClient";
import {
  getCategoryOptions,
  getCategoryTransactionsOptions,
} from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

type CategoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id: categoryId } = await params;
  const lastMonthRange = getLastMonthRange();

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getCategoryOptions(categoryId)),
    queryClient.prefetchQuery(
      getCategoryTransactionsOptions(categoryId, lastMonthRange),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader goBack title="Category Details" />
          <EditCategory categoryId={categoryId} />
        </div>
        <div className="h-full py-6">
          <CategoryDetails categoryId={categoryId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryDetailsPage;
