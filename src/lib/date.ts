import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  startOfMonth,
} from "date-fns";

export const generateMonthRange = (
  startDate: Date,
  endDate: Date,
): string[] => {
  const months: string[] = [];
  let currentDate = startOfMonth(startDate);
  const end = startOfMonth(endDate);

  while (
    isBefore(currentDate, end) ||
    currentDate.getTime() === end.getTime()
  ) {
    months.push(format(currentDate, "yyyy-MM"));
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};

export const getDaysOfMonth = (month: number) => {
  const date = new Date(2025, month, 1);

  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({ start, end });

  return days.map((day) => format(day, "yyyy-MM-dd"));
};

export const getStartEndFromMonth = (month: number) => {
  const currentYear = new Date().getFullYear();
  const referenceDate = new Date(currentYear, month, 1);

  return {
    start: format(startOfMonth(referenceDate), "PPP"),
    end: format(endOfMonth(referenceDate), "PPP"),
  };
};
