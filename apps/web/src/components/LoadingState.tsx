import { Spinner } from "@coin-guard/ui";

export const LoadingState = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="text-primary size-12" />
    </div>
  );
};
