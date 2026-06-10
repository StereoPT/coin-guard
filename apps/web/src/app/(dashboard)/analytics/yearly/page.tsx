import { YearlyAnalytics } from "@/components/analytics/YearlyAnalytics";
import { YearlySelection } from "@/components/analytics/YearlySelection";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { yearlyAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getYear } from "date-fns";

const YearlyPage = async () => {
  const year = getYear(new Date());

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(yearlyAnalyticsOptions(year));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex items-center justify-between">
          <PageHeader
            description="Your yearly overview"
            title="Yearly Analytics"
          />
          <YearlySelection />
        </div>
        <div className="h-full py-6">
          <YearlyAnalytics />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default YearlyPage;
