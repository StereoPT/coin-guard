"use client";

import { EditCategoryForm } from "@/components/categories/forms/EditCategoryForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coin-guard/ui";
import { Edit } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type EditCategoryDialogProps = {
  categoryId: string;
} & (
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    }
);

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  categoryId,
}: EditCategoryDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const handleOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit Category
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit your category details</DialogDescription>
        </DialogHeader>

        <EditCategoryForm categoryId={categoryId} setOpen={handleOpenChange} />
      </DialogContent>
    </Dialog>
  );
};
