"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useDeleteAllLookupCategories } from "@/hooks/etl/categories/useDeleteAllLookupCategories";
import type { CategoryWithLookups } from "@/types/categories";
import type { Dispatch, SetStateAction } from "react";

type DeleteLookupCategoriesDialogProps = {
  categoryWithLookups: CategoryWithLookups;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const DeleteLookupCategoriesDialog = ({
  categoryWithLookups,
  open,
  onOpenChange,
}: DeleteLookupCategoriesDialogProps) => {
  const { isPending, mutate } = useDeleteAllLookupCategories(
    categoryWithLookups.id,
  );

  const handleDeleteLookupCategories = () => {
    mutate();
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all lookups in{" "}
            <b>{categoryWithLookups.name}</b>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={handleDeleteLookupCategories}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
