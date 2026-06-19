import { ApplyLookupDescription } from "@/actions/etl/descriptions/ApplyLookupDescription";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useApplyLookupDescription = (lookupDescriptionId: string) => {
  const toastID = `apply-lookup-description-${lookupDescriptionId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Applying lookup description...", {
        description: "",
        id: toastID,
      });

      return ApplyLookupDescription(lookupDescriptionId);
    },
    onSuccess: () => {
      toast.success("Lookup description applied", {
        description: "",
        id: toastID,
      });
    },
    onError: ({ message }) => {
      toast.error("Failed to apply lookup description", {
        description: message ?? "Please try again later",
        id: toastID,
      });
    },
  });
};
