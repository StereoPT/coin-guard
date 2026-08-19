"use client";

import type { AnalyticsDateRange } from "@/lib/date";
import { getLastMonthRange } from "@/lib/date";
import { analyticsRangeAtom } from "@/store/analyticsStore";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@coin-guard/ui";
import { CalendarIcon } from "@coin-guard/ui/icons";
import {
  endOfMonth,
  endOfYear,
  format,
  isSameDay,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

type AnalyticsPreset = {
  key: string;
  label: string;
  range: AnalyticsDateRange;
};

const MIN_ANALYTICS_DATE = new Date(2024, 0, 1);

const getAnalyticsPresets = (): AnalyticsPreset[] => {
  const now = new Date();

  return [
    {
      key: "last-month",
      label: "Last Month",
      range: getLastMonthRange(),
    },
    {
      key: "last-3-months",
      label: "Last 3 Months",
      range: {
        from: startOfMonth(subMonths(now, 3)),
        to: endOfMonth(subMonths(now, 1)),
      },
    },
    {
      key: "last-6-months",
      label: "Last 6 Months",
      range: {
        from: startOfMonth(subMonths(now, 6)),
        to: endOfMonth(subMonths(now, 1)),
      },
    },
    {
      key: "this-year",
      label: "This Year",
      range: { from: startOfYear(now), to: endOfYear(now) },
    },
    {
      key: "last-year",
      label: "Last Year",
      range: {
        from: startOfYear(subYears(now, 1)),
        to: endOfYear(subYears(now, 1)),
      },
    },
    {
      key: "last-2-years",
      label: "Last 2 Years",
      range: {
        from: startOfYear(subYears(now, 1)),
        to: endOfYear(now),
      },
    },
    {
      key: "all-time",
      label: "All Time",
      range: {
        from: MIN_ANALYTICS_DATE,
        to: endOfMonth(subMonths(now, 1)),
      },
    },
  ];
};

export const AnalyticsDateSelection = () => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useAtom(analyticsRangeAtom);

  const presets = useMemo(() => getAnalyticsPresets(), []);

  const activePresetKey = useMemo(() => {
    const match = presets.find(
      (preset) =>
        isSameDay(preset.range.from, range.from) &&
        isSameDay(preset.range.to, range.to),
    );

    return match?.key ?? null;
  }, [presets, range]);

  const triggerLabel = useMemo(() => {
    const activePreset = presets.find(
      (preset) => preset.key === activePresetKey,
    );

    if (activePreset) return activePreset.label;

    return `${format(range.from, "MMM d, yyyy")} – ${format(range.to, "MMM d, yyyy")}`;
  }, [presets, activePresetKey, range]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button className="font-normal" variant="outline">
            <CalendarIcon className="opacity-50" />
            {triggerLabel}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-auto p-0">
        <Card className="max-w-112.5" size="sm">
          <CardContent>
            <Calendar
              captionLayout="dropdown"
              defaultMonth={range?.from}
              disabled={(date) =>
                date >= startOfMonth(new Date()) || date < MIN_ANALYTICS_DATE
              }
              mode="range"
              numberOfMonths={2}
              onSelect={(selected) => {
                if (selected?.from && selected?.to) {
                  setRange({ from: selected.from, to: selected.to });
                }
              }}
              selected={range}
              showOutsideDays={false}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 justify-center">
            {presets.map((preset) => (
              <Button
                className="flex-1"
                key={preset.key}
                onClick={() => {
                  setRange(preset.range);
                }}
                size="sm"
                variant={activePresetKey === preset.key ? "default" : "outline"}
              >
                {preset.label}
              </Button>
            ))}
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
