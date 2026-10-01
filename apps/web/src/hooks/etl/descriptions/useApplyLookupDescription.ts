import { ApplyLookupDescription } from "@/actions/etl/descriptions/ApplyLookupDescription";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useApplyLookupDescription = (lookupDescriptionId: string) => {
  const toastId = `apply-lookup-description-${lookupDescriptionId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Applying lookup description...", {
        description: "",
        id: toastId,
      });

      return ApplyLookupDescription(lookupDescriptionId);
    },
    onSuccess: () => {
      toast.success("Lookup description applied", {
        description: "",
        id: toastId,
      });
    },
    onError: ({ message }) => {
      toast.error("Failed to apply lookup description", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
