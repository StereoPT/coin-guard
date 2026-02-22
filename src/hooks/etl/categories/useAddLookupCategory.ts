import { AddLookupCategory } from "@/actions/etl/categories/addLookupCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addLookupCategorySchemaType } from "@/schemas/lookup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddLookupCategory = () => {
  const queryClient = getQueryClient();
  const toastId = "add-lookup-category";

  return useMutation({
    mutationFn: (data: addLookupCategorySchemaType) => {
      toast.loading("Creating lookup category...", { id: toastId });
      return AddLookupCategory(data);
    },
    onSuccess: () => {
      toast.success("Lookup category added", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: () => {
      toast.error("Failed to add lookup category", { id: toastId });
    },
  });
};
