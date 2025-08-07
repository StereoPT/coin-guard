import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category } from '@/generated/prisma';
import { useEditCategory } from '@/hooks/categories/useEditCategory';
import {
  editCategorySchema,
  editCategorySchemaType,
} from '@/schemas/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type EditCategoryFormProps = {
  setOpen: (prevOpen: boolean) => void;
  initialValues: Category;
};

export const EditCategoryForm = ({
  setOpen,
  initialValues,
}: EditCategoryFormProps) => {
  const form = useForm<editCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: initialValues,
  });

  const { mutateAsync, isPending } = useEditCategory(initialValues.id);

  const onSubmit = useCallback(
    async (values: editCategorySchemaType) => {
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {!isPending && 'Edit'}
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
