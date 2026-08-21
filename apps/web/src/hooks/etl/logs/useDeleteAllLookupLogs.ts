import { DeleteAllLookupLogs } from "@/actions/etl/logs/DeleteAllLookupLogs";
import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import { toast } from "@coin-guard/ui";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAllLookupLogs = () => {
  const queryClient = getQueryClient();
  const toastID = "delete-all-lookup-logs";

  return useMutation({
    mutationFn: () => {
      toast.loading("Deleting all logs...", {
        description: "",
        id: toastID,
      });

      return DeleteAllLookupLogs();
    },
    onSuccess: () => {
      toast.success("All logs deleted", {
        description: "",
        id: toastID,
      });

      queryClient.invalidateQueries({ queryKey: KEYS.lookupLogs });
    },
    onError: ({ message }) => {
      toast.error("Failed to delete all logs", {
        description: message ?? "Please try again later",
        id: toastID,
      });
    },
  });
};
