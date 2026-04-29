import { GetLookupCategories } from "@/actions/etl/categories/getLookupCategories";
import { GetLookupDescriptions } from "@/actions/etl/descriptions/GetLookupDescriptions";
import { GetLookupLogs } from "@/actions/etl/logs/GetLookupLogs";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getLookupCategoriesOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupCategories,
    queryFn: () => GetLookupCategories(),
  });
};

export const getLookupLogsOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupLogs,
    queryFn: () => GetLookupLogs(),
  });
};

export const getLookupDescriptionsOptions = () => {
  return queryOptions({
    queryKey: KEYS.lookupDescriptions,
    queryFn: () => GetLookupDescriptions(),
  });
};
