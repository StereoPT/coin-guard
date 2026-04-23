import { AddLookupDescriptionDialog } from "@/components/etl/dialogs/AddLookupDescriptionDialog";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const LookupDescriptionsPage = async () => {
  const queryClient = getQueryClient();

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
        <div className="h-full py-6">Lookup Descriptions Page</div>
      </div>
    </HydrationBoundary>
  );
};

export default LookupDescriptionsPage;
