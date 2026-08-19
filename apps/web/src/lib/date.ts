import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfYear,
  format,
  getDaysInMonth,
  isAfter,
  isBefore,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";

export type AnalyticsDateRange = {
  from: Date;
  to: Date;
};

export const getLastMonthRange = (): AnalyticsDateRange => {
  const now = new Date();

  return {
    from: startOfMonth(subMonths(now, 1)),
    to: endOfMonth(subMonths(now, 1)),
  };
};

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
  const date = new Date(2026, month, 1);

  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({ start, end });

  return days.map((day) => format(day, "yyyy-MM-dd"));
};

export const getMonthsOfYear = (year: number) => {
  const date = new Date(year, 1, 1);

  const start = startOfYear(date);
  const end = endOfYear(date);

  const months = eachMonthOfInterval({ start, end });

  return months.map((month) => format(month, "yyyy-MM"));
};

export const getStartEndFromMonth = (month: number) => {
  const currentYear = new Date().getFullYear();
  const referenceDate = new Date(currentYear, month, 1);

  return {
    start: format(startOfMonth(referenceDate), "PPP"),
    end: format(endOfMonth(referenceDate), "PPP"),
  };
};

export const getStartEndFromYear = (year: number) => {
  const referenceDate = new Date(year, 1, 1);

  return {
    start: format(startOfYear(referenceDate), "PPP"),
    end: format(endOfYear(referenceDate), "PPP"),
  };
};

export const getDaysInRange = (from: Date, to: Date): string[] => {
  return eachDayOfInterval({ start: from, end: to }).map((day) =>
    format(day, "yyyy-MM-dd"),
  );
};

export const getMonthsInRange = (from: Date, to: Date): string[] => {
  return eachMonthOfInterval({ start: from, end: to }).map((month) =>
    format(month, "yyyy-MM"),
  );
};

export const getYearsInRange = (from: Date, to: Date): string[] => {
  return eachYearOfInterval({ start: from, end: to }).map((year) =>
    format(year, "yyyy"),
  );
};

export type AnalyticsGranularity = "day" | "month" | "year";

export const getAnalyticsGranularity = (
  from: Date,
  to: Date,
): AnalyticsGranularity => {
  const rangeInDays = differenceInCalendarDays(to, from);
  const dayGranularityMaxDays = differenceInCalendarDays(
    addMonths(from, 2),
    from,
  );
  const monthGranularityMaxDays = differenceInCalendarDays(
    addYears(from, 2),
    from,
  );

  if (rangeInDays <= dayGranularityMaxDays) return "day";
  if (rangeInDays <= monthGranularityMaxDays) return "month";

  return "year";
};

export const getBudgetScaleFactor = (from: Date, to: Date): number => {
  let scaleFactor = 0;
  let cursor = startOfMonth(from);

  while (!isAfter(cursor, to)) {
    const daysInMonth = getDaysInMonth(cursor);
    const monthEnd = endOfMonth(cursor);

    const segmentStart = isAfter(cursor, from) ? cursor : from;
    const segmentEnd = isBefore(monthEnd, to) ? monthEnd : to;
    const daysInSegment = differenceInCalendarDays(segmentEnd, segmentStart) + 1;

    scaleFactor += daysInSegment / daysInMonth;
    cursor = addMonths(cursor, 1);
  }

  return scaleFactor;
};
