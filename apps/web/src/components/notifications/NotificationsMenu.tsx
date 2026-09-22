"use client";

import { NotificationList } from "@/components/notifications/NotificationList";
import { useDismissNotifications } from "@/hooks/notifications/useDismissNotifications";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Separator,
} from "@coin-guard/ui";
import { Bell } from "@coin-guard/ui/icons";

export const NotificationsMenu = () => {
  const { data: notifications, isPending } = useNotifications();
  const { dismiss, clearAll } = useDismissNotifications();
  const hasNotifications = (notifications?.length ?? 0) > 0;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label="Notifications"
            className="relative"
            size="icon"
            variant="ghost"
          />
        }
      >
        <Bell />
        {hasNotifications && (
          <span className="absolute top-1 right-1 size-2 rounded-full bg-primary ring-2 ring-background" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-md gap-0 p-0">
        <PopoverHeader className="flex-row items-center justify-between px-4 py-3">
          <PopoverTitle>Notifications</PopoverTitle>
          {hasNotifications && (
            <Button
              className="h-auto p-0 text-xs"
              onClick={clearAll}
              variant="link"
            >
              Clear all
            </Button>
          )}
        </PopoverHeader>
        <Separator />
        <NotificationList
          isPending={isPending}
          notifications={notifications ?? []}
          onDismiss={dismiss}
        />
      </PopoverContent>
    </Popover>
  );
};
