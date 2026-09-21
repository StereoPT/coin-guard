import { GetNotifications } from "@/actions/notifications/GetNotifications";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const notificationsOptions = () => {
  return queryOptions({
    queryKey: KEYS.notifications,
    queryFn: () => GetNotifications(),
    throwOnError: true,
  });
};
