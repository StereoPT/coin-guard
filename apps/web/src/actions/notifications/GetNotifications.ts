"use server";

import { GetTransactionCountForDate } from "@/actions/analytics/dashboard/GetTransactionCountForDate";

import type { Notification } from "@/types/notifications";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

export const GetNotifications = async (): Promise<Notification[]> => {
  const lastMonth = subMonths(new Date(), 1);
  const lastMonthTransactionCount = await GetTransactionCountForDate({
    gte: startOfMonth(lastMonth),
    lte: endOfMonth(lastMonth),
  });

  const notifications: Notification[] = [];

  if (lastMonthTransactionCount === 0) {
    notifications.push({
      id: "monthly-import-reminder",
      type: "MONTHLY_IMPORT_REMINDER",
      title: `No transactions for ${format(lastMonth, "MMMM yyyy")}`,
      description: "Import your bank statement to keep everything up to date.",
    });
  }

  return notifications;
};
