"use client";

import { AddLookupCategoryForm } from "@/components/etl/forms/AddLookupCategoryForm";
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
import { type Dispatch, type SetStateAction, useState } from "react";

type AddLookupCategoryDialogProps =
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
      categoryId?: never;
    }
  | {
      trigger?: never;
      categoryId: string;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    };

export const AddLookupCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  categoryId,
}: AddLookupCategoryDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const handleOnOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <PlusCircle />
            Add Lookup Category
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lookup Category</DialogTitle>
          <DialogDescription>Create your lookup categories</DialogDescription>
        </DialogHeader>

        <AddLookupCategoryForm
          categoryId={categoryId}
          setOpen={handleOnOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};
