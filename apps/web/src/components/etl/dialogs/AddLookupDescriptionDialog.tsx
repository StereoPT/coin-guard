"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { AddLookupDescriptionForm } from "@/components/etl/forms/AddLookupDescriptionForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, TextInitialIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

type AddLookupDescriptionDialogProps =
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
      description?: never;
    }
  | {
      trigger?: never;
      description: string;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    };

export const AddLookupDescriptionDialog = ({
  open,
  onOpenChange,
  trigger,
  description,
}: AddLookupDescriptionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const handleOnOpenChange = (prevOpen: boolean) => {
    if (!trigger) {
      onOpenChange(prevOpen);
    }

    setDialogOpen(prevOpen);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger asChild>
          <Button>
            <PlusCircle />
            Add Lookup Description
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={TextInitialIcon}
          subtitle="Create your lookup descriptions"
          title="Create Lookup Description"
        />
        <div className="px-4">
          <AddLookupDescriptionForm
            description={description}
            setOpen={handleOnOpenChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
