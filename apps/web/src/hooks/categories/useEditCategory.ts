import { EditCategory } from "@/actions/categories/EditCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editCategorySchemaType } from "@/schemas/categories";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useEditCategory = (categoryId: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-category-${categoryId}`;

  return useMutation({
    mutationFn: (data: editCategorySchemaType) => {
      toast.loading("Editing category...", {
        description: "",
        id: toastId,
      });

      return EditCategory(categoryId, data);
    },
    onSuccess: () => {
      toast.success("Category edited", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: ({ message }) => {
      toast.error("Failed to edit category", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
