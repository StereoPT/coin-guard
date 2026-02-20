import { DeleteAllLookupCategories } from "@/actions/etl/categories/deleteAllLookupCategories";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteAllLookupCategories = (id: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-all-lookup-categories-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting all lookup categories...", { id: toastID });
      return DeleteAllLookupCategories(id);
    },
    onSuccess: () => {
      toast.success("All lookup categories deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: () => {
      toast.error("Failed to delete all lookup categories", { id: toastID });
    },
  });
};
