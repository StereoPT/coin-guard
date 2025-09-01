import { YearlyAnalytics } from "@/actions/analytics/yearly/yearlyAnalytics";
import { UserYearlyAnalytics } from "@/components/analytics/UserYearlyAnalytics";
import { PageHeader } from "@/components/PageHeader";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getYear } from "date-fns";

const YearlyPage = async () => {
  const currentYear = getYear(new Date());

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: KEYS.yearlyAnalytics(currentYear),
    queryFn: () => YearlyAnalytics(currentYear),
  });

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
          <UserYearlyAnalytics year={currentYear} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default YearlyPage;
