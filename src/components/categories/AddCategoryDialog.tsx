"use client";

import { AddCategoryForm } from "@/components/categories/AddCategoryForm";
import { DialogHeader } from "@/components/DialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircle, TagIcon } from "lucide-react";
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
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TagIcon}
          subtitle="Create your categories"
          title="Create Category"
        />
        <div className="px-4 pt-4">
          <AddCategoryForm setOpen={setOpen} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
