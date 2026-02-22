import { Spinner } from "@/components/ui/spinner";
import { useAddCategory } from "@/hooks/categories/useAddCategory";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categories";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";

type AddCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddCategoryForm = ({ setOpen }: AddCategoryFormProps) => {
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
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Add"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
