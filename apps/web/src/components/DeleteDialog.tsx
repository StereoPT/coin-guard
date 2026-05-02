import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@coin-guard/ui";
import { buttonVariants } from "@coin-guard/ui";
import { Spinner } from "@coin-guard/ui";
import {
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type DeleteDialogProps = {
  title?: string;
  description: ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  onDelete: () => Promise<void>;
};

export const DeleteDialog = ({
  title = "Are you absolutely sure?",
  description,
  open,
  onOpenChange,
  isPending,
  onDelete,
}: DeleteDialogProps) => {
  const handleDelete = useCallback(async () => {
    await onDelete();
    onOpenChange(false);
  }, [onDelete, onOpenChange]);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
