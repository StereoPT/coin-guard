import { DialogHeader } from '@/components/DialogHeader';
import { EditTransactionForm } from '@/components/transactions/EditTransactionForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { TransactionWithCategory } from '@/types/transactions';
import { ArrowLeftRightIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type EditTransactionDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  transaction: TransactionWithCategory;
};

export const EditTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          title="Edit Transaction"
          subtitle="Edit your transaction"
          icon={ArrowLeftRightIcon}
        />
        <div className="px-4 pt-4">
          <EditTransactionForm
            initialValues={transaction}
            setOpen={onOpenChange}
          />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
