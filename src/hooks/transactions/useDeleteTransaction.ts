import { DeleteTransaction } from "@/actions/transactions/deleteTransaction";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = (id: string) => {
  const queryClient = useQueryClient();
  const toastID = `delete-transaction-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting transaction...", { id: toastID });
      return DeleteTransaction(id);
    },
    onSuccess: () => {
      toast.success("Transaction deleted", { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: () => {
      toast.error("Failed to delete transaction", { id: toastID });
    },
  });
};
