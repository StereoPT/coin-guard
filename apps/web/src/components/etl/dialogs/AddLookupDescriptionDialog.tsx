"use client";

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
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
  Switch,
} from "@coin-guard/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Controller, useForm } from "react-hook-form";

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
      description,
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
            <FieldGroup>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      New Description
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="New Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Controller
                  control={form.control}
                  name="enabled"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="enable-switch">Enable</FieldLabel>
                        <FieldDescription>
                          Enable to modify this description in the transaction.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Switch
                        aria-invalid={fieldState.invalid}
                        checked={field.value}
                        id="enable-switch"
                        name={field.name}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldGroup>
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
