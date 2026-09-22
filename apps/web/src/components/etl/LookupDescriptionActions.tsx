import { DeleteDialog } from "@/components/DeleteDialog";
import { ApplyLookupDescriptionAlert } from "@/components/etl/dialogs/ApplyLookupDescriptionAlert";
import { EditLookupDescriptionDialog } from "@/components/etl/dialogs/EditLookupDescriptionDialog";
import { useDeleteLookupDescription } from "@/hooks/etl/descriptions/useDeleteLookupDescription";
import type { LookupDescription } from "@coin-guard/db";
import { Button } from "@coin-guard/ui";
import { Edit, RefreshCw, Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

type LookupDescriptionActionsProps = {
  lookupDescription: LookupDescription;
};

export const LookupDescriptionActions = ({
  lookupDescription,
}: LookupDescriptionActionsProps) => {
  const [showApplyAlert, setShowApplyAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { isPending, mutateAsync } = useDeleteLookupDescription(
    lookupDescription.id,
  );

  return (
    <>
      {showApplyAlert && (
        <ApplyLookupDescriptionAlert
          lookupDescription={lookupDescription}
          onOpenChange={setShowApplyAlert}
          open={showApplyAlert}
        />
      )}

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

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          onClick={() => setShowApplyAlert(true)}
          size="icon"
          variant="ghost"
        >
          <RefreshCw />
        </Button>
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
