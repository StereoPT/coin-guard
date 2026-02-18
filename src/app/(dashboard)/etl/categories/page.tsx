import { AddLookupCategoryDialog } from "@/components/etl/dialogs/AddLookupCategoryDialog";
import { UserLookupCategories } from "@/components/etl/UserLookupCategories";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import { getLookupCategoriesOptions } from "@/lib/queryOptions/lookup";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const LookupCategoriesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesOptions());
  await queryClient.prefetchQuery(getLookupCategoriesOptions());

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
        <div className="h-full py-6">
          <UserLookupCategories />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default LookupCategoriesPage;
