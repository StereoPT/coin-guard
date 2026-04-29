import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import type { LookupDescription } from "@/generated/prisma/client";
import { useEditLookupDescription } from "@/hooks/etl/descriptions/useEditLookupDescription";
import {
  editLookupDescriptionSchema,
  type editLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

type EditLookupDescriptionForm = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: LookupDescription;
};

export const EditLookupDescriptionForm = ({
  setOpen,
  initialValues,
}: EditLookupDescriptionForm) => {
  const form = useForm<editLookupDescriptionSchemaType>({
    resolver: zodResolver(editLookupDescriptionSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const { mutateAsync, isPending } = useEditLookupDescription(initialValues.id);

  const onSubmit = useCallback(
    async (values: editLookupDescriptionSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Description</FormLabel>
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
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
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

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Edit"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
