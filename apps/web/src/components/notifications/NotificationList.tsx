import { NOTIFICATION_ICONS } from "@/components/notifications/notificationIcons";

import type { Notification } from "@/types/notifications";
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@coin-guard/ui";
import { X } from "@coin-guard/ui/icons";
import { cn } from "@coin-guard/ui/lib/utils";
import { Fragment } from "react";

type NotificationListProps = {
  notifications: Notification[];
  isPending: boolean;
  onDismiss: (id: string) => void;
};

export const NotificationList = ({
  notifications,
  isPending,
  onDismiss,
}: NotificationListProps) => {
  if (isPending) {
    return (
      <p className="px-4 py-6 text-center text-xs text-muted-foreground">
        Loading notifications…
      </p>
    );
  }

  if (notifications.length === 0) {
    return (
      <p className="px-4 py-6 text-center text-xs text-muted-foreground">
        No notifications yet.
      </p>
    );
  }

  return (
    <ItemGroup className="gap-0">
      {notifications.map((notification, index) => {
        const { icon: Icon, className } = NOTIFICATION_ICONS[notification.type];

        return (
          <Fragment key={notification.id}>
            {index > 0 && <ItemSeparator className="my-0" />}
            <Item className="rounded-none border-none px-4 py-3">
              <ItemMedia
                className={cn("size-8 rounded-full", className)}
                variant="icon"
              >
                <Icon className="size-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{notification.title}</ItemTitle>
                <ItemDescription className="text-xs">
                  {notification.description}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  aria-label="Dismiss notification"
                  onClick={() => onDismiss(notification.id)}
                  size="icon-xs"
                  variant="ghost"
                >
                  <X />
                </Button>
              </ItemActions>
            </Item>
          </Fragment>
        );
      })}
    </ItemGroup>
  );
};
