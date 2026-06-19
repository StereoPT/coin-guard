import { EditLookupCategory } from "@/actions/etl/categories/EditLookupCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editLookupCategorySchemaType } from "@/schemas/lookup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditLookupCategory = (lookupCategoryId: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-lookup-category-${lookupCategoryId}`;

  return useMutation({
    mutationFn: (data: editLookupCategorySchemaType) => {
      toast.loading("Editing lookup category...", {
        description: "",
        id: toastId,
      });

      return EditLookupCategory(lookupCategoryId, data);
    },
    onSuccess: () => {
      toast.success("Lookup category edited", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: ({ message }) => {
      toast.error("Failed to edit lookup category", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
