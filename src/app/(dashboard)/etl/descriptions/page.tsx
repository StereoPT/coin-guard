import { AddLookupDescriptionDialog } from "@/components/etl/dialogs/AddLookupDescriptionDialog";
import { UserLookupDescriptions } from "@/components/etl/UserLookupDescriptions";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { getLookupDescriptionsOptions } from "@/lib/queryOptions/lookup";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const LookupDescriptionsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getLookupDescriptionsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            description="Enhance your data with descriptions"
            title="Lookup Descriptions"
          />
          <AddLookupDescriptionDialog trigger />
        </div>
        <div className="h-full py-6">
          <UserLookupDescriptions />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default LookupDescriptionsPage;
