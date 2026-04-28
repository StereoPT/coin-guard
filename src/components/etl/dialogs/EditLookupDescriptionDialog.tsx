"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { EditLookupDescriptionForm } from "@/components/etl/forms/EditLookupDescriptionForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { LookupDescription } from "@/generated/prisma/client";
import { TextInitialIcon } from "lucide-react";
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
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TextInitialIcon}
          subtitle="Edit your lookup description"
          title="Edit Lookup Description"
        />
        <div className="px-4">
          <EditLookupDescriptionForm
            initialValues={lookupDescription}
            setOpen={onOpenChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
