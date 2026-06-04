import { getMonth, getYear, subMonths } from "date-fns";
import { atom } from "jotai";

export const monthlyAnalyticsAtom = atom<number>(
  getMonth(subMonths(new Date(), 1)),
);

export const yearlyAnalyticsAtom = atom<number>(getYear(new Date()));
