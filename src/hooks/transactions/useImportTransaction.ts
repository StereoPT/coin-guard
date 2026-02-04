import { ImportTransaction } from "@/actions/transactions/importTransaction";
import type { ProcessedTransaction } from "@/actions/transactions/parseTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useImportTransaction = () => {
  const queryClient = getQueryClient();
  const toastId = "import-transactions";

  return useMutation({
    mutationFn: async (transactions: ProcessedTransaction[]) => {
      toast.loading("Importing transactions...", {
        id: toastId,
      });

      return ImportTransaction(transactions);
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
