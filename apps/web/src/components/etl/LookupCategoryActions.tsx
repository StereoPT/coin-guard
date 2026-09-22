"use client";

import { DeleteDialog } from "@/components/DeleteDialog";
import { EditLookupCategoryDialog } from "@/components/etl/dialogs/EditLookupCategoryDialog";
import { useDeleteLookupCategory } from "@/hooks/etl/categories/useDeleteLookupCategory";
import type { LookupCategoryWithCategoryName } from "@/types/categories";
import { Button } from "@coin-guard/ui";
import { Edit, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupCategoryActionsProps = {
  lookupCategory: LookupCategoryWithCategoryName;
};

export const LookupCategoryActions = ({
  lookupCategory,
}: LookupCategoryActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteLookupCategory(lookupCategory.id);

  return (
    <>
      {showEditDialog && (
        <EditLookupCategoryDialog
          lookupCategory={lookupCategory}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{lookupCategory.description}</b>.
              This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
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
