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
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TagsIcon}
          subtitle="Create your lookup categories"
          title="Create Lookup Category"
        />
        <div className="px-4 pt-4">
          <AddLookupCategoryForm
            categoryId={categoryId}
            setOpen={handleOnOpenChange}
          />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
