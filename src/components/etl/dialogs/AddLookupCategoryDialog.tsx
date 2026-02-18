"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { AddLookupCategoryForm } from "@/components/etl/forms/AddLookupCategoryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, TagsIcon } from "lucide-react";
import { useState } from "react";

export const AddLookupCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Lookup Category
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TagsIcon}
          subtitle="Create your lookup categories"
          title="Create Lookup Category"
        />
        <div className="px-4 pt-4">
          <AddLookupCategoryForm setOpen={setOpen} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
