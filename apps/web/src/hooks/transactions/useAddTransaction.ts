import { AddTransaction } from "@/actions/transactions/AddTransaction";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addTransactionSchemaType } from "@/schemas/transactions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTransaction = () => {
  const queryClient = getQueryClient();
  const toastId = "add-transaction";

  return useMutation({
    mutationFn: (data: addTransactionSchemaType) => {
      toast.loading("Creating transaction...", {
        description: "",
        id: toastId,
      });

      return AddTransaction(data);
    },
    onSuccess: () => {
      toast.success("Transaction added", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.transactions });
    },
    onError: ({ message }) => {
      toast.error("Failed to add transaction", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
