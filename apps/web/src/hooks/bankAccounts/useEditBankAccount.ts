import { EditBankAccount } from "@/actions/bankAccounts/EditBankAccount";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { editBankAccountSchemaType } from "@/schemas/bankAccounts";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useEditBankAccount = (bankAccountId: string) => {
  const queryClient = getQueryClient();
  const toastId = `edit-bank-account-${bankAccountId}`;

  return useMutation({
    mutationFn: (data: editBankAccountSchemaType) => {
      toast.loading("Editing bank account...", {
        description: "",
        id: toastId,
      });

      return EditBankAccount(bankAccountId, data);
    },
    onSuccess: () => {
      toast.success("Bank account edited", {
        description: "",
        id: toastId,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.bankAccounts });
    },
    onError: ({ message }) => {
      toast.error("Failed to edit bank account", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
