import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  format,
  getDaysInMonth,
  isAfter,
  isBefore,
  startOfMonth,
  subMonths,
} from "date-fns";

export type DateRange = {
  from: Date;
  to: Date;
};

export const getLastMonthRange = (): DateRange => {
  const now = new Date();

  return {
    from: startOfMonth(subMonths(now, 1)),
    to: endOfMonth(subMonths(now, 1)),
  };
};

export const generateMonthRange = (range: DateRange): string[] => {
  const months: string[] = [];
  let currentDate = startOfMonth(range.from);
  const end = startOfMonth(range.to);

  while (
    isBefore(currentDate, end) ||
    currentDate.getTime() === end.getTime()
  ) {
    months.push(format(currentDate, "yyyy-MM"));
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};

export const getDaysInRange = (range: DateRange): string[] => {
  return eachDayOfInterval({ start: range.from, end: range.to }).map((day) =>
    format(day, "yyyy-MM-dd"),
  );
};

export const getMonthsInRange = (range: DateRange): string[] => {
  return eachMonthOfInterval({ start: range.from, end: range.to }).map(
    (month) => format(month, "yyyy-MM"),
  );
};

export const getYearsInRange = (range: DateRange): string[] => {
  return eachYearOfInterval({ start: range.from, end: range.to }).map((year) =>
    format(year, "yyyy"),
  );
};

export type AnalyticsGranularity = "day" | "month" | "year";

export const getAnalyticsGranularity = (
  range: DateRange,
): AnalyticsGranularity => {
  const rangeInDays = differenceInCalendarDays(range.to, range.from);
  const dayGranularityMaxDays = differenceInCalendarDays(
    addMonths(range.from, 2),
    range.from,
  );
  const monthGranularityMaxDays = differenceInCalendarDays(
    addYears(range.from, 2),
    range.from,
  );

  if (rangeInDays <= dayGranularityMaxDays) return "day";
  if (rangeInDays <= monthGranularityMaxDays) return "month";

  return "year";
};

export const getBudgetScaleFactor = (range: DateRange): number => {
  let scaleFactor = 0;
  let cursor = startOfMonth(range.from);

  while (!isAfter(cursor, range.to)) {
    const daysInMonth = getDaysInMonth(cursor);
    const monthEnd = endOfMonth(cursor);

    const segmentStart = isAfter(cursor, range.from) ? cursor : range.from;
    const segmentEnd = isBefore(monthEnd, range.to) ? monthEnd : range.to;
    const daysInSegment =
      differenceInCalendarDays(segmentEnd, segmentStart) + 1;

    scaleFactor += daysInSegment / daysInMonth;
    cursor = addMonths(cursor, 1);
  }

  return scaleFactor;
};
