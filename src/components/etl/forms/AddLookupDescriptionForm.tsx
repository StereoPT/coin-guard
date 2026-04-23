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
import { useAddLookupDescription } from "@/hooks/etl/descriptions/useAddLookupDescription";
import {
  addLookupDescriptionSchema,
  type addLookupDescriptionSchemaType,
} from "@/schemas/lookup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

type AddLookupDescriptionFormProps = {
  setOpen: (prevOpen: boolean) => void;
  description?: string;
};

export const AddLookupDescriptionForm = ({
  setOpen,
  description = "",
}: AddLookupDescriptionFormProps) => {
  const form = useForm<addLookupDescriptionSchemaType>({
    resolver: zodResolver(addLookupDescriptionSchema),
    defaultValues: {
      description,
      newDescription: "",
      enabled: true,
    },
  });

  const { mutateAsync, isPending } = useAddLookupDescription();

  const onSubmit = useCallback(
    async (values: addLookupDescriptionSchemaType) => {
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
          {!isPending && "Add"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
