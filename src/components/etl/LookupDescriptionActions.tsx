import { DeleteDialog } from "@/components/DeleteDialog";
import { EditLookupDescriptionDialog } from "@/components/etl/dialogs/EditLookupDescriptionDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LookupDescription } from "@/generated/prisma/client";
import { useDeleteLookupDescription } from "@/hooks/etl/descriptions/useDeleteLookupDescription";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

type LookupDescriptionActionsProps = {
  lookupDescription: LookupDescription;
};

export const LookupDescriptionActions = ({
  lookupDescription,
}: LookupDescriptionActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteLookupDescription(
    lookupDescription.id,
  );

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete{" "}
              <b>{lookupDescription.description}</b>. This action cannot be
              undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditLookupDescriptionDialog
          lookupDescription={lookupDescription}
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
