"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { Dialog, DialogContent, DialogDescription } from "@/ui/dialog";

import { PlusCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { AddTransactionForm } from "@/components/transactions/AddTransactionForm";

type AddTransactionDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddTransactionDialog = ({
  open,
  setOpen,
}: AddTransactionDialogProps) => {
  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogContent className="px-0 py-4 !max-w-2xl">
        <DialogHeader
          icon={PlusCircle}
          subtitle="Create a new transaction"
          title="Create Transaction"
        />
        <div className="px-4">
          <AddTransactionForm setOpen={setOpen} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
