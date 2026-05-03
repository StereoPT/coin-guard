import { DeleteLookupDescription } from "@/actions/etl/descriptions/DeleteLookupDescription";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteLookupDescription = (lookupDescriptionId: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-lookup-description-${lookupDescriptionId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting lookup description...", { id: toastID });
      return DeleteLookupDescription(lookupDescriptionId);
    },
    onSuccess: () => {
      toast.success("Lookup description deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupDescriptions });
    },
    onError: () => {
      toast.error("Failed to delete lookup description", { id: toastID });
    },
  });
};
