import { Categories } from "@/components/categories/Categories";
import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const CategoriesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader
          actions={<AddCategoryDialog />}
          description="Categories overview"
          title="Categories"
        />

        <div className="h-full py-6">
          <Categories />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
