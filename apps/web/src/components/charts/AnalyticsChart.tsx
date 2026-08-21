"use client";

import {
  getAnalyticsGranularity,
  getDaysInRange,
  getMonthsInRange,
  getYearsInRange,
  type AnalyticsGranularity,
  type DateRange,
} from "@/lib/date";
import type { Transaction } from "@coin-guard/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@coin-guard/ui";
import { format } from "date-fns";
import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
} from "@coin-guard/ui/charts";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#0f766e",
  },
  trend: {
    label: "Trend",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const GRANULARITY_CONFIG: Record<
  AnalyticsGranularity,
  { dateFormat: string; title: string; description: string }
> = {
  day: {
    dateFormat: "yyyy-MM-dd",
    title: "Expenses per day",
    description: "Breakdown of daily expenses for the selected period",
  },
  month: {
    dateFormat: "yyyy-MM",
    title: "Expenses per month",
    description: "Breakdown of monthly expenses for the selected period",
  },
  year: {
    dateFormat: "yyyy",
    title: "Expenses per year",
    description: "Breakdown of yearly expenses for the selected period",
  },
};

type AnalyticsChartProps = {
  transactions: Transaction[];
  range: DateRange;
};

export const AnalyticsChart = ({
  transactions,
  range,
}: AnalyticsChartProps) => {
  const granularity = useMemo(() => getAnalyticsGranularity(range), [range]);
  const { dateFormat, title, description } = GRANULARITY_CONFIG[granularity];

  const transactionData = useMemo(() => {
    const transactionsByBucket = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const bucketKey = format(t.date, dateFormat);
        acc[bucketKey] = (acc[bucketKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const buckets =
      granularity === "day"
        ? getDaysInRange(range)
        : granularity === "month"
          ? getMonthsInRange(range)
          : getYearsInRange(range);

    const bucketedData = buckets.map((bucketKey) => ({
      date: bucketKey,
      amount: transactionsByBucket[bucketKey] || 0,
    }));

    return bucketedData.map((item, index, arr) => {
      const startIndex = Math.max(0, index - 2);
      const windowSlice = arr.slice(startIndex, index + 1);
      const trend =
        windowSlice.reduce((acc, current) => acc + current.amount, 0) /
        windowSlice.length;

      return {
        ...item,
        trend,
      };
    });
  }, [transactions, range, granularity, dateFormat]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          className="aspect-auto h-80 w-full pt-6"
          config={chartConfig}
        >
          <ComposedChart
            accessibilityLayer
            data={transactionData}
            margin={{ left: 24, right: 24, top: 24 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              fillOpacity={0.8}
              radius={4}
            />
            <Line
              dataKey="trend"
              dot={false}
              stroke="var(--color-trend)"
              strokeDasharray="7 7"
              strokeWidth={2}
              type="monotone"
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
