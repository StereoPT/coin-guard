import { GetLookupCategories } from "@/actions/etl/categories/GetLookupCategories";
import { GetLookupDescriptions } from "@/actions/etl/descriptions/GetLookupDescriptions";
import { GetLookupLogs } from "@/actions/etl/logs/GetLookupLogs";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getLookupCategoriesOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupCategories,
    queryFn: () => GetLookupCategories(),
    throwOnError: true,
  });
};

export const getLookupLogsOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupLogs,
    queryFn: () => GetLookupLogs(),
    throwOnError: true,
  });
};

export const getLookupDescriptionsOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupDescriptions,
    queryFn: () => GetLookupDescriptions(),
    throwOnError: true,
  });
};
