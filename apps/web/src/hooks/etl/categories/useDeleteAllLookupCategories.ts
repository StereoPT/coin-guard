import { DeleteAllLookupCategories } from "@/actions/etl/categories/DeleteAllLookupCategories";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAllLookupCategories = (categoryId: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-all-lookup-categories-${categoryId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting all lookup categories...", {
        description: "",
        id: toastID,
      });

      return DeleteAllLookupCategories(categoryId);
    },
    onSuccess: () => {
      toast.success("All lookup categories deleted", {
        description: "",
        id: toastID,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: ({ message }) => {
      toast.error("Failed to delete all lookup categories", {
        description: message ?? "Please try again later",
        id: toastID,
      });
    },
  });
};
