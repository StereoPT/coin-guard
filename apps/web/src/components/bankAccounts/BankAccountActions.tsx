import { EditBankAccountDialog } from "@/components/bankAccounts/dialogs/EditBankAccountDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteBankAccount } from "@/hooks/bankAccounts/useDeleteBankAccount";
import type { BankAccount } from "@coin-guard/db";
import { Button } from "@coin-guard/ui";
import { Edit, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type BankAccountActionsProps = {
  bankAccount: BankAccount;
};

export const BankAccountActions = ({
  bankAccount,
}: BankAccountActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteBankAccount(bankAccount.id);

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{bankAccount.name}</b> with the
              IBAN <b>{bankAccount.iban}</b>. This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditBankAccountDialog
          bankAccount={bankAccount}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          onClick={() => setShowEditDialog(true)}
          size="icon"
          variant="ghost"
        >
          <Edit />
        </Button>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
};
