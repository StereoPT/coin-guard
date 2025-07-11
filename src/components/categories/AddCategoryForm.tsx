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
import { useAddCategory } from '@/hooks/categories/useAddCategory';
import { addCategorySchema, addCategorySchemaType } from '@/schemas/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useForm } from 'react-hook-form';

type AddCategoryFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddCategoryForm = ({ setOpen }: AddCategoryFormProps) => {
  const form = useForm<addCategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: '',
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {!isPending && 'Add'}
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
