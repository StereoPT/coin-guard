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
import { useAddLookupCategory } from "@/hooks/etl/categories/useAddLookupCategory";
import {
  addLookupCategorySchema,
  type addLookupCategorySchemaType,
} from "@/schemas/lookup";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetStateAction } from "jotai";
import { Check } from "lucide-react";
import { useCallback, type Dispatch } from "react";
import { useForm } from "react-hook-form";

type EditAddLookupCategoryFormProps = {
  categoryId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditAddLookupCategoryForm = ({
  categoryId,
  setOpen,
}: EditAddLookupCategoryFormProps) => {
  const form = useForm<addLookupCategorySchemaType>({
    resolver: zodResolver(addLookupCategorySchema),
    defaultValues: {
      categoryId,
      description: "",
      enabled: true,
    },
  });

  const { mutateAsync, isPending } = useAddLookupCategory();

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

          <Button disabled={isPending} size="icon" variant="outline">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
};
