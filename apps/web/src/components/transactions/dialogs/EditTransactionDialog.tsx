"use client";

import { EditTransactionForm } from "@/components/transactions/forms/EditTransactionForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coin-guard/ui";
import { Edit } from "lucide-react";
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
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Edit your transaction</DialogDescription>
        </DialogHeader>

        <EditTransactionForm
          setOpen={handleOpenChange}
          transactionId={transactionId}
        />
      </DialogContent>
    </Dialog>
  );
};
