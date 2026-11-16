import { isValid, parse } from "date-fns";

export const parseNumbers = (value: string) => {
  const cleanValue = value
    .replace(/[^\d.,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number.parseFloat(cleanValue);
  return Math.round(number * 100) / 100;
};

const toUTCMidnight = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

export const parseDates = (dateString: string, format: string) => {
  if (!dateString || typeof dateString !== "string") return null;

  try {
    const parsedDate = parse(dateString.trim(), format, new Date());

    if (!isValid(parsedDate)) return null;

    return toUTCMidnight(parsedDate);
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.warn("Error parsing date:", dateString, error);
    return null;
  }
};
