import { getLookupDescriptionsOptions } from "@/lib/queryOptions/lookup";
import { useQuery } from "@tanstack/react-query";

export const useGetLookupDescriptions = () => {
  return useQuery(getLookupDescriptionsOptions());
};
