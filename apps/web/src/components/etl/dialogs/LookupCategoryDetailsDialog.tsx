"use client";

import { LookupCategoryItem } from "@/components/etl/LookupCategoryItem";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{categoryWithLookups.name}</DialogTitle>
          <DialogDescription>
            View your lookup category details
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-4">
          {categoryWithLookups.lookups.map((lookup) => (
            <LookupCategoryItem key={lookup.id} lookup={lookup} />
          ))}
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
