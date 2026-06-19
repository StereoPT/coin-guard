import { AddCategory } from "@/actions/categories/AddCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addCategorySchemaType } from "@/schemas/categories";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddCategory = () => {
  const queryClient = getQueryClient();
  const toastId = "add-category";

  return useMutation({
    mutationFn: (data: addCategorySchemaType) => {
      toast.loading("Creating category...", {
        description: "",
        id: toastId,
      });

      return AddCategory(data);
    },
    onSuccess: () => {
      toast.success("Category added", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: ({ message }) => {
      toast.error("Failed to add category", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
