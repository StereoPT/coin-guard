import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";
import { EditTransactionDialog } from "@/components/transactions/EditTransactionDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TransactionWithCategory } from "@/types/transactions";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

type TransactionActionsProps = {
  transaction: TransactionWithCategory;
};

export const TransactionActions = ({
  transaction,
}: TransactionActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      {showDeleteAlert && (
        <DeleteTransactionDialog
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
          transaction={transaction}
        />
      )}

      {showEditDialog && (
        <EditTransactionDialog
          id={transaction.id}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
