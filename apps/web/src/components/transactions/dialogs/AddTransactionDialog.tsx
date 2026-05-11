"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@coin-guard/ui";

import type { Dispatch, SetStateAction } from "react";

import { AddTransactionForm } from "@/components/transactions/forms/AddTransactionForm";

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
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Create Transaction</DialogTitle>
          <DialogDescription>Create a new transaction</DialogDescription>
        </DialogHeader>

        <AddTransactionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
