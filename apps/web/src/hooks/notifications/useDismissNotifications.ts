import { KEYS } from "@/constants/queryKeys";
import { getQueryClient } from "@/lib/getQueryClient";
import type { Notification } from "@/types/notifications";

export const useDismissNotifications = () => {
  const queryClient = getQueryClient();

  const dismiss = (id: string) => {
    queryClient.setQueryData<Notification[]>(KEYS.notifications, (current) =>
      (current ?? []).filter((notification) => notification.id !== id),
    );
  };

  const clearAll = () => {
    queryClient.setQueryData<Notification[]>(KEYS.notifications, []);
  };

  return { dismiss, clearAll };
};
