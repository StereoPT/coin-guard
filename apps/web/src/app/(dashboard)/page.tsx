import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { PageHeader } from "@/components/PageHeader";
import { config } from "@/constants";
import { getQueryClient } from "@/lib/getQueryClient";
import { dashboardAnalyticsOptions } from "@/lib/queryOptions/analytics";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(dashboardAnalyticsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col h-full">
        <PageHeader
          description="This is your finance report"
          title={`Welcome, ${config.username}`}
        />
        <div className="h-full py-6">
          <UserDashboard />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
