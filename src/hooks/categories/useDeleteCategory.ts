import { DeleteCategory } from '@/actions/categories/deleteCategory';
import { KEYS } from '@/constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  const toastID = `delete-category-${id}`;

  return useMutation({
    mutationFn: () => {
      toast.loading('Deleting category...', { id: toastID });
      return DeleteCategory(id);
    },
    onSuccess: () => {
      toast.success('Category deleted', { id: toastID });
      queryClient.invalidateQueries({ queryKey: KEYS.categories });
    },
    onError: () => {
      toast.error('Failed to delete category', { id: toastID });
    },
  });
};
