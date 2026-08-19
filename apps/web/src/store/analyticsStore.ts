import type { AnalyticsDateRange } from "@/lib/date";
import { getLastMonthRange } from "@/lib/date";
import { getYear } from "date-fns";
import { atom } from "jotai";

export const yearlyAnalyticsAtom = atom<number>(getYear(new Date()));

export const analyticsRangeAtom = atom<AnalyticsDateRange>(getLastMonthRange());
