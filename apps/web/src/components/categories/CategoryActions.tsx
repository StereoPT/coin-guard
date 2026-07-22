import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import type { Category } from "@coin-guard/db";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";

import { Button } from "@coin-guard/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { Edit, MoreHorizontal, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type CategoryActionsProps = {
  category: Category;
};

export const CategoryActions = ({ category }: CategoryActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteCategory(category.id);

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{category.name}</b>. This action
              cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditCategoryDialog
          categoryId={category.id}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteAlert(true)}
            variant="destructive"
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
