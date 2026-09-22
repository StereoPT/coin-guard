import { DeleteDialog } from "@/components/DeleteDialog";
import { EditTransactionDialog } from "@/components/transactions/dialogs/EditTransactionDialog";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import type { TransactionWithRelations } from "@/types/transactions";
import { Button } from "@coin-guard/ui";
import { Edit, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type TransactionActionsProps = {
  transaction: TransactionWithRelations;
};

export const TransactionActions = ({
  transaction,
}: TransactionActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteTransaction(transaction.id);

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{transaction.description}</b>.
              This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditTransactionDialog
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
          transactionId={transaction.id}
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
