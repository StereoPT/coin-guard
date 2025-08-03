import { EditCategory } from '@/actions/categories/editCategory';
import { KEYS } from '@/constants/queryKeys';
import { editCategorySchemaType } from '@/schemas/categories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditCategory = (categoryId: string) => {
  const queryClient = useQueryClient();
  const toastId = `edit-category-${categoryId}`;

  return useMutation({
    mutationFn: (data: editCategorySchemaType) => {
      toast.loading('Editing category...', { id: toastId });
      return EditCategory(categoryId, data);
    },
    onSuccess: () => {
      toast.success('Category edited', { id: toastId });
      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: () => {
      toast.error('Failed to edit category', { id: toastId });
    },
  });
};
