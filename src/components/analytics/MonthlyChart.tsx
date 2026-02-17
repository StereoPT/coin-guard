import type { Transaction } from "@/generated/prisma/client";
import { getDaysOfMonth } from "@/lib/date";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
import { format } from "date-fns";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  date: {
    label: "Amount",
  },
} satisfies ChartConfig;

type MonthlyChartProps = {
  transactions?: Transaction[];
  selectedMonth: number;
};

export const MonthlyChart = ({
  transactions = [],
  selectedMonth,
}: MonthlyChartProps) => {
  const transactionData = useMemo(() => {
    const transactionsByDay = transactions.reduce<Record<string, number>>(
      (acc, t) => {
        const dayKey = format(t.date, "yyyy-MM-dd");
        acc[dayKey] = (acc[dayKey] || 0) + t.amount;
        return acc;
      },
      {},
    );

    const allDays = getDaysOfMonth(selectedMonth);

    const transactionData = allDays.map((dayKey) => ({
      date: dayKey,
      amount: transactionsByDay[dayKey] || 0,
    }));

    return Object.values(transactionData);
  }, [transactions, selectedMonth]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Expenses per Day</CardTitle>
        <CardDescription>
          For the month of: {format(new Date(2026, selectedMonth, 1), "MMMM")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={transactionData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickFormatter={(value) => format(value, "yyyy-MM-dd")}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Area dataKey="amount" fillOpacity={0.4} type="monotone" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
