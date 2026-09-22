export type NotificationType = "MONTHLY_IMPORT_REMINDER";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
};
