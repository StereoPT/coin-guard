"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/ui/dialog";

import { ArrowLeftRightIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { AddTransactionForm } from "@/components/transactions/AddTransactionForm";
import { AddTransactionWithFile } from "@/components/transactions/AddTransactionWithFile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

export const AddTransactionDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4 !max-w-2xl">
        <DialogHeader
          icon={ArrowLeftRightIcon}
          subtitle="Create or import transactions"
          title="Create Transactions"
        />
        <Tabs className="px-4" defaultValue="file">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          <TabsContent className="pt-4" value="file">
            <AddTransactionWithFile setOpen={setOpen} />
          </TabsContent>
          <TabsContent className="pt-4" value="form">
            <AddTransactionForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
