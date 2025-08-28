"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { AddTransactionWithFile } from "@/components/transactions/AddTransactionWithFile";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/ui/dialog";
import { FileDown } from "lucide-react";
import { useState } from "react";

export const ImportTransactions = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className="rounded-r-none border-r border-r-white/30">
          <FileDown />
          Import Transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={FileDown}
          subtitle="Import your transactions from CGD"
          title="Import Transactions"
        />
        <div className="px-4">
          <AddTransactionWithFile setOpen={setOpen} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
