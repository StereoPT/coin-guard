"use client";

import { CategoryFormFields } from "@/components/categories/CategoryFormFields";
import { useAddCategory } from "@/hooks/categories/useAddCategory";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categories";
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
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const AddCategoryDialog = () => {
  const formId = "add-category";
  const [open, setOpen] = useState(false);

  const form = useForm<addCategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync, isPending } = useAddCategory();

  const onSubmit = useCallback(
    async (values: addCategorySchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync],
  );

  return (
    <Dialog onOpenChange={(prevOpen) => setOpen(prevOpen)} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create categories for your transactions
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <CategoryFormFields formId={formId} />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
