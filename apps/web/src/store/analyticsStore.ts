import type { DateRange } from "@/lib/date";
import { getLastMonthRange } from "@/lib/date";
import { atom } from "jotai";

export const analyticsRangeAtom = atom<DateRange>(getLastMonthRange());
