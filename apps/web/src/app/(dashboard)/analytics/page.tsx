import { Analytics } from "@/components/analytics/Analytics";
import { AnalyticsDateSelection } from "@/components/analytics/AnalyticsDateSelection";
import { PageHeader } from "@/components/PageHeader";
import { getLastMonthRange } from "@/lib/date";
import { getQueryClient } from "@/lib/getQueryClient";
import { analyticsOptions } from "@/lib/queryOptions/analytics";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const AnalyticsPage = async () => {
  const queryClient = getQueryClient();

  const lastMonthRange = getLastMonthRange();
  await queryClient.prefetchQuery(analyticsOptions(lastMonthRange));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex items-center justify-between">
          <PageHeader description="Your analytics overview" title="Analytics" />
          <AnalyticsDateSelection />
        </div>
        <div className="h-full py-6">
          <Analytics />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default AnalyticsPage;
