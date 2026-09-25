import { ParseTransaction } from "@/actions/transactions/ParseTransaction";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useParseTransaction = () => {
  const toastId = "parse-transactions";

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return ParseTransaction(formData);
    },
    onError: ({ message }) => {
      toast.error("Failed to parse CSV file", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
