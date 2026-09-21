import { NOTIFICATION_ICONS } from "@/components/notifications/notificationIcons";

import type { Notification } from "@/types/notifications";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@coin-guard/ui";
import { cn } from "@coin-guard/ui/lib/utils";
import { Fragment } from "react";

type NotificationListProps = {
  notifications: Notification[];
  isPending: boolean;
};

export const NotificationList = ({
  notifications,
  isPending,
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
            </Item>
          </Fragment>
        );
      })}
    </ItemGroup>
  );
};
