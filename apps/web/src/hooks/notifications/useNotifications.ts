import { notificationsOptions } from "@/lib/queryOptions/notifications";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery(notificationsOptions());
};
