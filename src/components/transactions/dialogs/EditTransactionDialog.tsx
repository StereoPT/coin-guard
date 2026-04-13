"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { EditTransactionForm } from "@/components/transactions/forms/EditTransactionForm";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import { ArrowLeftRightIcon, Edit } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type EditTransactionDialogProps = {
  transactionId: string;
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
  transactionId,
}: EditTransactionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const handleOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

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
      <DialogContent className="px-0 py-4 max-w-2xl!">
        <DialogHeader
          icon={ArrowLeftRightIcon}
          subtitle="Edit your transaction"
          title="Edit Transaction"
        />
        <div className="px-4">
          <EditTransactionForm
            setOpen={handleOpenChange}
            transactionId={transactionId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
