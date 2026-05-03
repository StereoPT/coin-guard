import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { UserCategories } from "@/components/categories/UserCategories";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CategoriesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader description="Categories overview" title="Categories" />
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
