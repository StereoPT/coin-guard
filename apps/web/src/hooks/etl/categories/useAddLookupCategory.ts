import { AddLookupCategory } from "@/actions/etl/categories/AddLookupCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addLookupCategorySchemaType } from "@/schemas/lookup";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useAddLookupCategory = () => {
  const queryClient = getQueryClient();
  const toastId = "add-lookup-category";

  return useMutation({
    mutationFn: (data: addLookupCategorySchemaType) => {
      toast.loading("Creating lookup category...", {
        description: "",
        id: toastId,
      });

      return AddLookupCategory(data);
    },
    onSuccess: () => {
      toast.success("Lookup category added", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: ({ message }) => {
      toast.error("Failed to add lookup category", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
