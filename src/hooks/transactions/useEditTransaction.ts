import { EditTransaction } from '@/actions/transactions/editTransaction';
import { editTransactionSchemaType } from '@/schemas/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditTransaction = (transactionId: string) => {
  const queryClient = useQueryClient();
  const toastId = `edit-transaction-${transactionId}`;

  return useMutation({
    mutationFn: (data: editTransactionSchemaType) => {
      toast.loading('Editing transaction...', { id: toastId });
      return EditTransaction(transactionId, data);
    },
    onSuccess: () => {
      toast.success('Transaction edited', { id: toastId });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('Failed to edit transaction', { id: toastId });
    },
  });
};
