import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Transaction } from '@/generated/prisma';
import { useDeleteTransaction } from '@/hooks/transactions/useDeleteTransaction';

type DeleteTransactionDialogProps = {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
}: DeleteTransactionDialogProps) => {
  const { isPending, mutate } = useDeleteTransaction(transaction.id);

  const handleDeleteTransaction = () => {
    mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <b>{transaction.description}</b>. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={handleDeleteTransaction}
            disabled={isPending}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
