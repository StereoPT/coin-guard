import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import type { Category } from "@coin-guard/db";

import { Button } from "@coin-guard/ui";
import { Edit, Trash2 } from "@coin-guard/ui/icons";
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

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          onClick={() => setShowEditDialog(true)}
          size="icon"
          variant="ghost"
        >
          <Edit />
        </Button>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
};
