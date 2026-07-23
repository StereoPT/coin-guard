"use client";

import { EditLookupCategoryForm } from "@/components/etl/forms/EditLookupCategoryForm";
import type { CategoryWithLookups } from "@/types/categories";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@coin-guard/ui";
import type { Dispatch, SetStateAction } from "react";

type EditLookupCategoryDialogProps = {
  categoryWithLookups: CategoryWithLookups;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const EditLookupCategoryDialog = ({
  categoryWithLookups,
  open,
  onOpenChange,
}: EditLookupCategoryDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your lookup category</DialogTitle>
          <DialogDescription>Edit {categoryWithLookups.name}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {categoryWithLookups.lookups.map((lookup) => (
            <EditLookupCategoryForm
              initialValues={lookup}
              key={lookup.id}
              setOpen={onOpenChange}
            />
          ))}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
