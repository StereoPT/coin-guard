import { EditLookupCategory } from "@/actions/etl/categories/editLookupCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editLookupCategorySchemaType } from "@/schemas/lookup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditLookupCategory = (id: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-lookup-category-${id}`;

  return useMutation({
    mutationFn: (data: editLookupCategorySchemaType) => {
      toast.loading("Editing lookup category...", { id: toastId });
      return EditLookupCategory(id, data);
    },
    onSuccess: () => {
      toast.success("Lookup category edited", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: () => {
      toast.error("Failed to edit lookup category", { id: toastId });
    },
  });
};
