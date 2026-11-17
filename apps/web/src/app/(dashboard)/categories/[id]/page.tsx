import { CategoryDetails } from "@/components/categories/CategoryDetails";
import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { PageHeader } from "@/components/PageHeader";
import { getLastMonthRange } from "@/lib/date";
import { getQueryClient } from "@/lib/getQueryClient";
import {
  getCategoryOptions,
  getCategoryTransactionsOptions,
} from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type CategoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id: categoryId } = await params;
  const lastMonthRange = getLastMonthRange();

  const queryClient = getQueryClient();
  const categoryOptions = getCategoryOptions(categoryId);
  await Promise.all([
    queryClient.prefetchQuery(categoryOptions),
    queryClient.prefetchQuery(
      getCategoryTransactionsOptions(categoryId, lastMonthRange),
    ),
  ]);

  if (!queryClient.getQueryData(categoryOptions.queryKey)) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader
          actions={<EditCategoryDialog categoryId={categoryId} trigger />}
          goBack
          title="Category Details"
        />
        <div className="h-full py-6">
          <CategoryDetails categoryId={categoryId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryDetailsPage;
