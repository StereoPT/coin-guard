import { getLookupLogsOptions } from "@/lib/queryOptions/lookup";
import { useQuery } from "@tanstack/react-query";

export const useGetLookupLogs = () => {
  return useQuery(getLookupLogsOptions());
};
