"use client";

import { EditCategoryForm } from "@/components/categories/forms/EditCategoryForm";
import { DialogHeader } from "@/components/DialogHeader";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/ui/dialog";
import { Edit, Tag } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type EditCategoryDialogProps = {
  id: string;
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
  id,
}: EditCategoryDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);
  const { data: category, isPending } = useGetCategory(id);

  const handleOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  if (isPending) {
    return null;
  }

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
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={Tag}
          subtitle="Edit your category"
          title="Edit Category"
        />
        <div className="px-4 pt-4">
          {category && (
            <EditCategoryForm
              initialValues={category}
              setOpen={handleOpenChange}
            />
          )}
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
