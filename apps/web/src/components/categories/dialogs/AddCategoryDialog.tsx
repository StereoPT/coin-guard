"use client";

import { AddCategoryForm } from "@/components/categories/forms/AddCategoryForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coin-guard/ui";

import { PlusCircle } from "lucide-react";
import { useState } from "react";

export const AddCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create categories for your transactions
          </DialogDescription>
        </DialogHeader>

        <AddCategoryForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
