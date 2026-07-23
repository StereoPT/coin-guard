"use client";

import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useAddLookupCategory } from "@/hooks/etl/categories/useAddLookupCategory";
import {
  addLookupCategorySchema,
  type addLookupCategorySchemaType,
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
  Input,
  SearchableSelect,
  Spinner,
  Switch,
} from "@coin-guard/ui";
import { PlusCircle } from "@coin-guard/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

type AddLookupCategoryDialogProps =
  | {
      trigger: true;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
      categoryId?: never;
    }
  | {
      trigger?: never;
      categoryId: string;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    };

export const AddLookupCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
  categoryId,
}: AddLookupCategoryDialogProps) => {
  const formId = "add-lookup-category";
  const [dialogOpen, setDialogOpen] = useState(open ?? false);

  const { data: categories } = useGetCategories();

  const form = useForm<addLookupCategorySchemaType>({
    resolver: zodResolver(addLookupCategorySchema),
    defaultValues: {
      description: "",
      categoryId,
      enabled: true,
    },
  });

  const { mutateAsync, isPending } = useAddLookupCategory();

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

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
    async (values: addLookupCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      handleOnOpenChange(false);
    },
    [form, mutateAsync, handleOnOpenChange],
  );

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={dialogOpen}>
      {trigger && (
        <DialogTrigger render={<Button />}>
          <PlusCircle />
          Add Lookup Category
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lookup Category</DialogTitle>
          <DialogDescription>Create your lookup categories</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="categoryId"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <SearchableSelect
                      emptyPlaceholder="No category found."
                      onChange={field.onChange}
                      options={categoryOptions}
                      placeholder="Select a Category"
                      searchPlaceholder="Search a category..."
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={`${formId}-description`}>
                      Description
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-description`}
                      placeholder="Description"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
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
                        <FieldDescription className="text-xs">
                          Enable to add this category to the transaction.
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
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Lookup Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
