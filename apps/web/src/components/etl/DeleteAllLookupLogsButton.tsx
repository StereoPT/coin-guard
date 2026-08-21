"use client";

import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteAllLookupLogs } from "@/hooks/etl/logs/useDeleteAllLookupLogs";
import { Button } from "@coin-guard/ui";
import { Trash2 } from "@coin-guard/ui/icons";
import { useState } from "react";

export const DeleteAllLookupLogsButton = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { isPending, mutateAsync } = useDeleteAllLookupLogs();

  return (
    <>
      {showDeleteDialog && (
        <DeleteDialog
          description="This will permanently delete all lookup logs. This action cannot be undone."
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteDialog}
          open={showDeleteDialog}
          title="Delete all logs?"
        />
      )}

      <Button onClick={() => setShowDeleteDialog(true)} variant="destructive">
        <Trash2 /> Delete Logs
      </Button>
    </>
  );
};
