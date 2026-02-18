import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const LookupCategoriesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            description="Enhance you data with categories"
            title="Lookup Categories"
          />
          <AddLookupCategoryDialog />
        </div>
        <div className="h-full py-6">Lookup Categories Page</div>
      </div>
    </HydrationBoundary>
  );
};

export default LookupCategoriesPage;
