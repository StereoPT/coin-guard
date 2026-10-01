import { ExportDatabase } from "@/actions/settings/ExportDatabase";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useExportDatabase = () => {
  const toastId = "export-database";

  return useMutation({
    mutationFn: () => {
      toast.loading("Exporting database...", {
        description: "",
        id: toastId,
      });

      return ExportDatabase();
    },
    onSuccess: () => {
      toast.success("Database exported", {
        description: "",
        id: toastId,
      });
    },
    onError: ({ message }) => {
      toast.error("Failed to export database", {
        description: message ?? "Please try again later",
        id: toastId,
      });
    },
  });
};
