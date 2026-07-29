import { EditBankAccountDialog } from "@/components/bankAccounts/dialogs/EditBankAccountDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteBankAccount } from "@/hooks/bankAccounts/useDeleteBankAccount";
import type { BankAccount } from "@coin-guard/db";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { Edit, MoreHorizontal, Trash2 } from "@coin-guard/ui/icons";
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

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowDeleteAlert(true)}
              variant="destructive"
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
