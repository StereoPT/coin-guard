import { DeleteTransactionDialog } from '@/components/transactions/DeleteTransactionDialog';
import { EditTransactionDialog } from '@/components/transactions/EditTransactionDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionWithCategory } from '@/types/transactions';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
          open={showDeleteAlert}
          onOpenChange={setShowDeleteAlert}
          transaction={transaction}
        />
      )}

      {showEditDialog && (
        <EditTransactionDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          transaction={transaction}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
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
            variant="destructive"
            onClick={() => setShowDeleteAlert(true)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
