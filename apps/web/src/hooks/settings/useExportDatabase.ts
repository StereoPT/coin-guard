import { ExportDatabase } from "@/actions/settings/ExportDatabase";
import { useMutation } from "@tanstack/react-query";

export const useExportDatabase = () => {
  return useMutation({
    mutationFn: () => ExportDatabase(),
  });
};
