import { AddCategory } from "@/actions/categories/addCategory";
import { KEYS } from "@/constants/queryKeys";
import type { addCategorySchemaType } from "@/schemas/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const toastId = "add-category";

  return useMutation({
    mutationFn: (data: addCategorySchemaType) => {
      toast.loading("Creating category...", { id: toastId });
      return AddCategory(data);
    },
    onSuccess: () => {
      toast.success("Category added", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: () => {
      toast.error("Failed to add category", { id: toastId });
    },
  });
};
