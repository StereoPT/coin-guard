import { UserYearlyAnalytics } from "@/components/analytics/UserYearlyAnalytics";
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
        <div className="flex justify-between">
          <PageHeader
            description="Your yearly overview"
            title="Yearly Analytics"
          />
        </div>
        <div className="h-full py-6">
          <UserYearlyAnalytics year={year} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default YearlyPage;
