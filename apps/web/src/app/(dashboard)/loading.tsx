import { LoadingState } from "@/components/LoadingState";

const DashboardLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-7.25rem)] w-full">
      <LoadingState />
    </div>
  );
};

export default DashboardLoading;
