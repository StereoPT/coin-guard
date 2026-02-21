"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { EditLookupCategoryForm } from "@/components/etl/forms/EditLookupCategoryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import type { CategoryWithLookups } from "@/types/categories";
import { TagIcon } from "lucide-react";
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
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TagIcon}
          subtitle="Edit your lookup category"
          title={`Edit ${categoryWithLookups.name}`}
        />
        <div className="px-4 pt-4">
          <div className="flex flex-col gap-4">
            {categoryWithLookups.lookups.map((lookup) => (
              <EditLookupCategoryForm
                initialValues={lookup}
                key={lookup.id}
                setOpen={onOpenChange}
              />
            ))}
          </div>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
