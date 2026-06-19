import { EditTransaction } from "@/actions/transactions/EditTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editTransactionSchemaType } from "@/schemas/transactions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditTransaction = (transactionId: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-transaction-${transactionId}`;

  return useMutation({
    mutationFn: (data: editTransactionSchemaType) => {
      toast.loading("Editing transaction...", {
        description: "",
        id: toastId,
      });

      return EditTransaction(transactionId, data);
    },
    onSuccess: () => {
      toast.success("Transaction edited", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: ({ message }) => {
      toast.error("Failed to edit transaction", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
