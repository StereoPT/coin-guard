import { AddBankAccount } from "@/actions/bankAccounts/AddBankAccount";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { addBankAccountSchemaType } from "@/schemas/bankAccounts";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useAddBankAccount = () => {
  const queryClient = getQueryClient();
  const toastId = "add-bank-account";

  return useMutation({
    mutationFn: (data: addBankAccountSchemaType) => {
      toast.loading("Creating bank account...", {
        description: "",
        id: toastId,
      });

      return AddBankAccount(data);
    },
    onSuccess: () => {
      toast.success("Bank account added", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.bankAccounts });
    },
    onError: ({ message }) => {
      toast.error("Failed to add bank account", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
