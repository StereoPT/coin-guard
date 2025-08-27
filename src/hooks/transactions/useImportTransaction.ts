import { ImportTransaction } from "@/actions/transactions/importTransaction";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useImportTransaction = () => {
  const queryClient = useQueryClient();
  const toastId = "import-transaction";

  return useMutation({
    mutationFn: async (file: File) => {
      toast.loading("Importing transaction...", {
        id: toastId,
      });

      const formData = new FormData();
      formData.append("file", file);

      return ImportTransaction(formData);
    },
    onSuccess: () => {
      toast.success("Transactions imported", { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: () => {
      toast.error("Failed to import transactions", {
        id: toastId,
      });
    },
  });
};
