import { DeleteBankAccount } from "@/actions/bankAccounts/DeleteBankAccount";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBankAccount = (bankAccountId: string) => {
  const queryClient = getQueryClient();
  const toastID = `delete-bank-account-${bankAccountId}`;

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting bank account...", {
        description: "",
        id: toastID,
      });

      return DeleteBankAccount(bankAccountId);
    },
    onSuccess: () => {
      toast.success("Bank account deleted", {
        description: "",
        id: toastID,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.bankAccounts });
    },
    onError: ({ message }) => {
      toast.error("Failed to delete bank account", {
        description: message ?? "Please try again later",
        id: toastID,
      });
    },
  });
};
