"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { LookupCategoryItem } from "@/components/etl/LookupCategoryItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import type { CategoryWithLookups } from "@/types/categories";
import type { SetStateAction } from "jotai";
import { TagIcon } from "lucide-react";
import type { Dispatch } from "react";

type LookupCategoryDetailsDialogProps = {
  categoryWithLookups: CategoryWithLookups;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const LookupCategoryDetailsDialog = ({
  categoryWithLookups,
  open,
  onOpenChange,
}: LookupCategoryDetailsDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TagIcon}
          subtitle="View your lookup category details"
          title={categoryWithLookups.name}
        />
        <div className="px-4 pt-4">
          <ul className="flex flex-col gap-4">
            {categoryWithLookups.lookups.map((lookup) => (
              <LookupCategoryItem key={lookup.id} lookup={lookup} />
            ))}
          </ul>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
