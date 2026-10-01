import { DeleteLookupDescription } from "@/actions/etl/descriptions/DeleteLookupDescription";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteLookupDescription = (lookupDescriptionId: string) => {
  const queryClient = getQueryClient();
  const toastId = `delete-lookup-description-${lookupDescriptionId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting lookup description...", {
        description: "",
        id: toastId,
      });

      return DeleteLookupDescription(lookupDescriptionId);
    },
    onSuccess: () => {
      toast.success("Lookup description deleted", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.lookupDescriptions });
    },
    onError: () => {
      toast.error("Failed to delete lookup description", {
        description: "",
        id: toastId,
      });
    },
  });
};
