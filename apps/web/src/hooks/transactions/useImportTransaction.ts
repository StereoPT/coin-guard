import { ImportTransaction } from "@/actions/transactions/ImportTransaction";
import type { ProcessedTransaction } from "@/actions/transactions/ParseTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useImportTransaction = () => {
  const queryClient = getQueryClient();
  const toastId = "import-transactions";

  return useMutation({
    mutationFn: async (transactions: ProcessedTransaction[]) => {
      toast.loading("Importing transactions...", {
        description: "",
        id: toastId,
      });

      return ImportTransaction(transactions);
    },
    onSuccess: () => {
      toast.success("Transactions imported", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: ({ message }) => {
      toast.error("Failed to import transactions", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
