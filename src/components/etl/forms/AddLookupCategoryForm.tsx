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
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useAddLookupCategory } from "@/hooks/etl/categories/useAddLookupCategory";
import {
  addLookupCategorySchema,
  type addLookupCategorySchemaType,
} from "@/schemas/lookup";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCallback,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Controller, useForm } from "react-hook-form";

type AddLookupCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddLookupCategoryForm = ({
  setOpen,
}: AddLookupCategoryFormProps) => {
  const { data: categories } = useGetCategories();

  const form = useForm<addLookupCategorySchemaType>({
    resolver: zodResolver(addLookupCategorySchema),
    defaultValues: {
      description: "",
      categoryId: undefined,
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

  const onSubmit = useCallback(
    async (values: addLookupCategorySchemaType) => {
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
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center">Category</FormLabel>
              <SearchableSelect
                emptyPlaceholer="No category found."
                onChange={field.onChange}
                options={categoryOptions}
                placeholder="Select a Category"
                searchPlaceholder="Search a category..."
                value={field.value}
              />
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

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Add"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
