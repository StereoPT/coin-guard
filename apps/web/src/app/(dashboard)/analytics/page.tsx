import { AnalyticsDateSelection } from "@/components/analytics/AnalyticsDateSelection";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const AnalyticsPage = async () => {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex items-center justify-between">
          <PageHeader description="Your analytics overview" title="Analytics" />
          <AnalyticsDateSelection />
        </div>
        <div className="h-full py-6">Analytics Here</div>
      </div>
    </HydrationBoundary>
  );
};

export default AnalyticsPage;
