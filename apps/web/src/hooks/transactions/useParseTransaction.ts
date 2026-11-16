import { ParseTransaction } from "@/actions/transactions/ParseTransaction";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

type parseTransactionType = {
  file: File;
  alias: string;
};

export const useParseTransaction = () => {
  const toastId = "parse-transactions";

  return useMutation({
    mutationFn: async (parseData: parseTransactionType) => {
      const formData = new FormData();

      formData.append("file", parseData.file);
      formData.append("alias", parseData.alias);

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
