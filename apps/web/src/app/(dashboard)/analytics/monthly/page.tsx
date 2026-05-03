import { UserMonthlyAnalytics } from "@/components/analytics/UserMonthlyAnalytics";
import { PageHeader } from "@/components/PageHeader";
import { getQueryClient } from "@/lib/getQueryClient";
import { monthlyAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMonth, subMonths } from "date-fns";

const MonthlyPage = async () => {
  const month = getMonth(subMonths(new Date(), 1));

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(monthlyAnalyticsOptions(month));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            description="Your monthly overview"
            title="Monthly Analytics"
          />
        </div>
        <div className="h-full py-6">
          <UserMonthlyAnalytics month={month} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default MonthlyPage;
