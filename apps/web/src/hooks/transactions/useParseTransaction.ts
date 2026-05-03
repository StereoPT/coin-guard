import { ParseTransaction } from "@/actions/transactions/parseTransaction";
import { useMutation } from "@tanstack/react-query";

export const useParseTransaction = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return ParseTransaction(formData);
    },
  });
};
