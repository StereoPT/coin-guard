import { addMonths, format, isBefore, startOfMonth } from 'date-fns';

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
    months.push(format(currentDate, 'yyyy-MM'));
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};
