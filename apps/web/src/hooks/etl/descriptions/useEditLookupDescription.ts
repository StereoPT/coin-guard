import { EditLookupDescription } from "@/actions/etl/descriptions/EditLookupDescription";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editLookupDescriptionSchemaType } from "@/schemas/lookup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditLookupDescription = (lookupDescriptionId: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-lookup-description-${lookupDescriptionId}`;

  return useMutation({
    mutationFn: (data: editLookupDescriptionSchemaType) => {
      toast.loading("Editing lookup description...", { id: toastId });
      return EditLookupDescription(lookupDescriptionId, data);
    },
    onSuccess: () => {
      toast.success("Lookup description edited", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupDescriptions });
    },
    onError: () => {
      toast.error("Failed to edit lookup description", { id: toastId });
    },
  });
};
