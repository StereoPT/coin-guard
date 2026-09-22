import type { NotificationType } from "@/types/notifications";
import type { LucideIcon } from "@coin-guard/ui/icons";
import { CalendarClock } from "@coin-guard/ui/icons";

type NotificationPropType = { icon: LucideIcon; className: string };

export const NOTIFICATION_ICONS: Record<
  NotificationType,
  NotificationPropType
> = {
  MONTHLY_IMPORT_REMINDER: {
    icon: CalendarClock,
    className: "bg-amber-100 text-amber-700",
  },
};
