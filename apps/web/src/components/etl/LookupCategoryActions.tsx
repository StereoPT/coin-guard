"use client";

import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteLookupCategory } from "@/hooks/etl/categories/useDeleteLookupCategory";
import type { LookupCategoryWithCategoryName } from "@/types/categories";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@coin-guard/ui";
import { Edit, MoreHorizontal, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupCategoryActionsProps = {
  lookupCategory: LookupCategoryWithCategoryName;
};

export const LookupCategoryActions = ({
  lookupCategory,
}: LookupCategoryActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { isPending, mutateAsync } = useDeleteLookupCategory(lookupCategory.id);

  return (
    <>
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

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
