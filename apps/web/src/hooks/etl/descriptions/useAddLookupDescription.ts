import { AddLookupDescription } from "@/actions/etl/descriptions/AddLookupDescription";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addLookupDescriptionSchemaType } from "@/schemas/lookup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddLookupDescription = () => {
  const queryClient = getQueryClient();
  const toastId = "add-lookup-description";

  return useMutation({
    mutationFn: (data: addLookupDescriptionSchemaType) => {
      toast.loading("Creating lookup description...", { id: toastId });
      return AddLookupDescription(data);
    },
    onSuccess: () => {
      toast.success("Lookup description added", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupDescriptions });
    },
    onError: () => {
      toast.error("Failed to add lookup description", { id: toastId });
    },
  });
};
