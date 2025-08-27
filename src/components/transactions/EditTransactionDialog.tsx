"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { EditTransactionForm } from "@/components/transactions/EditTransactionForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";
import { ArrowLeftRightIcon, Edit } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type EditTransactionDialogProps = {
  id: string;
} & (
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    }
);

export const EditTransactionDialog = ({
  open,
  onOpenChange,
  trigger,
  id,
}: EditTransactionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);
  const { data: transaction, isPending } = useGetTransaction(id);

  const handleOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  if (isPending) {
    return null;
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit Transaction
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="px-0 py-4 !max-w-2xl">
        <DialogHeader
          icon={ArrowLeftRightIcon}
          subtitle="Edit your transaction"
          title="Edit Transaction"
        />
        <div className="px-4 pt-4">
          {transaction && (
            <EditTransactionForm
              initialValues={transaction.transaction}
              setOpen={handleOpenChange}
            />
          )}
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
