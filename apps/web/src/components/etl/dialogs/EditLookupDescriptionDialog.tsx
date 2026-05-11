"use client";

import { EditLookupDescriptionForm } from "@/components/etl/forms/EditLookupDescriptionForm";
import type { LookupDescription } from "@coin-guard/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@coin-guard/ui";
import type { Dispatch, SetStateAction } from "react";

type EditLookupDescriptionDialogProps = {
  lookupDescription: LookupDescription;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export const EditLookupDescriptionDialog = ({
  lookupDescription,
  onOpenChange,
  open,
}: EditLookupDescriptionDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lookup Description</DialogTitle>
          <DialogDescription>Edit your lookup description</DialogDescription>
        </DialogHeader>

        <EditLookupDescriptionForm
          initialValues={lookupDescription}
          setOpen={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};
