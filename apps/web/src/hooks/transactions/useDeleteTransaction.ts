import { DeleteTransaction } from "@/actions/transactions/DeleteTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTransaction = (transactionId: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-transaction-${transactionId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting transaction...", {
        description: "",
        id: toastID,
      });

      return DeleteTransaction(transactionId);
    },
    onSuccess: () => {
      toast.success("Transaction deleted", {
        description: "",
        id: toastID,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: ({ message }) => {
      toast.error("Failed to delete transaction", {
        description: message ?? "Please try again later",
        id: toastID,
      });
    },
  });
};
