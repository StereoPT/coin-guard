import { ExportDatabase } from "@/actions/settings/exportDatabase";
import { useMutation } from "@tanstack/react-query";

export const useExportDatabase = () => {
  return useMutation({
    mutationFn: () => ExportDatabase(),
  });
};
