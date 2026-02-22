"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { Lookup_Category } from "@/generated/prisma/client";
import { useDeleteLookupCategory } from "@/hooks/etl/categories/useDeleteLookupCategory";
import { useEditLookupCategory } from "@/hooks/etl/categories/useEditLookupCategory";
import {
  editLookupCategorySchema,
  type editLookupCategorySchemaType,
} from "@/schemas/lookup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash2 } from "lucide-react";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

type EditLookupCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: Lookup_Category;
};

export const EditLookupCategoryForm = ({
  setOpen,
  initialValues,
}: EditLookupCategoryFormProps) => {
  const form = useForm<editLookupCategorySchemaType>({
    resolver: zodResolver(editLookupCategorySchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const { mutateAsync: mutateAsyncEdit, isPending: isPendingEdit } =
    useEditLookupCategory(initialValues.id);
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } =
    useDeleteLookupCategory(initialValues.id);

  const onSubmit = useCallback(
    async (values: editLookupCategorySchemaType) => {
      await mutateAsyncEdit(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsyncEdit, setOpen],
  );

  const onDelete = useCallback(async () => {
    await mutateAsyncDelete();
    form.reset();
    setOpen(false);
  }, [form, mutateAsyncDelete, setOpen]);

  const isPending = isPendingEdit || isPendingDelete;

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 w-full items-center">
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <Button
              disabled={isPending}
              onClick={onDelete}
              size="icon"
              type="button"
              variant="destructive"
            >
              <Trash2 />
            </Button>
            <Button disabled={isPending} size="icon" variant="outline">
              <Check />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
