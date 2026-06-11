"use client";

import { LookupDescriptionFormField } from "@/components/etl/LookupDescriptionFormField";
import { useAddLookupDescription } from "@/hooks/etl/descriptions/useAddLookupDescription";
import {
  addLookupDescriptionSchema,
  type addLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  Spinner,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";

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
  const formId = "add-lookup-description";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const form = useForm<addLookupDescriptionSchemaType>({
    resolver: zodResolver(addLookupDescriptionSchema),
    defaultValues: {
      description: description ?? "",
      newDescription: "",
      enabled: true,
    },
  });

  const { mutateAsync, isPending } = useAddLookupDescription();

  const handleOnOpenChange = useCallback(
    (prevOpen: boolean) => {
      if (!trigger) {
        onOpenChange(prevOpen);
      }

      setDialogOpen(prevOpen);
    },
    [trigger, onOpenChange],
  );

  const onSubmit = useCallback(
    async (values: addLookupDescriptionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      handleOnOpenChange(false);
    },
    [form, mutateAsync, handleOnOpenChange],
  );

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

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <LookupDescriptionFormField formId={formId} />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Lookup Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
