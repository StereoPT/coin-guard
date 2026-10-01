import { DeleteCategory } from "@/actions/categories/DeleteCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategory = (categoryId: string) => {
  const queryClient = getQueryClient();
  const toastId = `delete-category-${categoryId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting category...", {
        description: "",
        id: toastId,
      });

      return DeleteCategory(categoryId);
    },
    onSuccess: () => {
      toast.success("Category deleted", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: ({ message }) => {
      toast.error("Failed to delete category", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
