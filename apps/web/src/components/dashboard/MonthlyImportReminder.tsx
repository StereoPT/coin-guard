"use client";

import { useState } from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@coin-guard/ui";
import { CalendarClock, X } from "@coin-guard/ui/icons";

import { format, subMonths } from "date-fns";

export const MonthlyImportReminder = () => {
  const [dismissed, setDismissed] = useState(false);
  const lastMonth = subMonths(new Date(), 1);

  if (dismissed) {
    return null;
  }

  return (
    <Alert className="border-amber-200 bg-amber-50 text-amber-900">
      <CalendarClock />
      <AlertTitle>
        No transactions for {format(lastMonth, "MMMM yyyy")}
      </AlertTitle>
      <AlertDescription className="text-xs">
        Import your bank statement to keep everything up to date.
      </AlertDescription>
      <AlertAction>
        <X
          className="cursor-pointer size-4"
          onClick={() => setDismissed(true)}
        />
      </AlertAction>
    </Alert>
  );
};
