"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import type { LookupDescription } from "@/generated/prisma/client";
import { useApplyLookupDescription } from "@/hooks/etl/descriptions/useApplyLookupDescription";
import { useCallback, type Dispatch, type SetStateAction } from "react";

type ApplyLookupDescriptionAlertProps = {
  lookupDescription: LookupDescription;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export const ApplyLookupDescriptionAlert = ({
  lookupDescription,
  onOpenChange,
  open,
}: ApplyLookupDescriptionAlertProps) => {
  const { mutateAsync, isPending } = useApplyLookupDescription(
    lookupDescription.id,
  );

  const handleApply = useCallback(async () => {
    await mutateAsync();
    onOpenChange(false);
  }, [mutateAsync, onOpenChange]);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will transform all your transactions with the description{" "}
            <b>{lookupDescription.description}</b> to become{" "}
            <b>{lookupDescription.newDescription}</b>.
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleApply}>
            {isPending && <Spinner />}
            Apply
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
