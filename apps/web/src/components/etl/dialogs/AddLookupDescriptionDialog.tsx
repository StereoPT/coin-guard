"use client";

import { AddLookupDescriptionForm } from "@/components/etl/forms/AddLookupDescriptionForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coin-guard/ui";
import { PlusCircle } from "lucide-react";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lookup Description</DialogTitle>
          <DialogDescription>Create your lookup descriptions</DialogDescription>
        </DialogHeader>

        <AddLookupDescriptionForm
          description={description}
          setOpen={handleOnOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};
