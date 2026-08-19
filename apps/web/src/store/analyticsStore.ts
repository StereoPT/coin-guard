import type { AnalyticsDateRange } from "@/lib/date";
import { getLastMonthRange } from "@/lib/date";
import { atom } from "jotai";

export const analyticsRangeAtom = atom<AnalyticsDateRange>(getLastMonthRange());
