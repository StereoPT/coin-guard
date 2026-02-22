import { DeleteLookupCategory } from "@/actions/etl/categories/deleteLookupCategory";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteLookupCategory = (id: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-lookup-category-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting lookup category...", { id: toastID });
      return DeleteLookupCategory(id);
    },
    onSuccess: () => {
      toast.success("Lookup category deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.lookupCategories });
    },
    onError: () => {
      toast.error("Failed to delete lookup category", { id: toastID });
    },
  });
};
