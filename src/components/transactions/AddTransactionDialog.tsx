'use client';

import { DialogHeader } from '@/components/DialogHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ArrowLeftRightIcon, PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddTransactionWithForm } from '@/components/transactions/AddTransactionWithForm';
import { AddTransactionWithFile } from '@/components/transactions/AddTransactionWithFile';

export const AddTransactionDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          title="Create Transactions"
          subtitle="Create or import transactions"
          icon={ArrowLeftRightIcon}
        />
        <Tabs defaultValue="file" className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="pt-4">
            <AddTransactionWithFile setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="form" className="pt-4">
            <AddTransactionWithForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
