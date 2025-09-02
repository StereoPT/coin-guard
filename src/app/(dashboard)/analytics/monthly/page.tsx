import { MonthlyAnalytics } from "@/actions/analytics/monthlyAnalytics";
import { UserMonthlyAnalytics } from "@/components/analytics/UserMonthlyAnalytics";
import { PageHeader } from "@/components/PageHeader";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMonth, subMonths } from "date-fns";

const MonthlyPage = async () => {
  const currentMonth = getMonth(subMonths(new Date(), 1));

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.monthlyAnalytics(currentMonth),
    queryFn: () => MonthlyAnalytics(currentMonth),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex justify-between">
          <PageHeader
            description="You monthly overview"
            title="Monthly Analytics"
          />
        </div>
        <div className="h-full py-6">
          <UserMonthlyAnalytics month={currentMonth} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default MonthlyPage;
