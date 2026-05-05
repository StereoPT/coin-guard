"use client";

import { formatCurrency } from "@/lib/formatter";
import type { CategoryStats } from "@/types/categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@coin-guard/ui";
import { useMemo } from "react";
import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

type DashboardCategoryChartProps = {
  categoryStats: CategoryStats[];
};

export const DashboardCategoryChart = ({
  categoryStats,
}: DashboardCategoryChartProps) => {
  const id = "dashboard-categories";

  const chartConfig = useMemo(() => {
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];

    const config: Record<string, { label: string; color?: string }> = {
      totalAmount: {
        label: "Amount",
      },
    };

    categoryStats.forEach((stat, index) => {
      config[stat.categoryId] = {
        label: stat.categoryName,
        color: colors[index % colors.length],
      };
    });

    return config;
  }, [categoryStats]);

  return (
    <Card className="h-full flex flex-col" data-chart={id}>
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div>
          <CardTitle>Category Summary</CardTitle>
          <CardDescription>Categories with the most expenses</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="flex h-full w-full justify-center">
          <ChartStyle config={chartConfig} id={id} key={id} />
          <ChartContainer
            className="mx-auto aspect-square min-h-32"
            config={chartConfig}
            id={id}
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, _name, item) => {
                      return (
                        <div className="flex flex-col gap-1" key="tooltip">
                          <span className="text-foreground text-xs font-bold">
                            {item.payload.categoryName}
                          </span>
                          <span className="text-foreground font-medium">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                      );
                    }}
                    hideLabel
                  />
                }
                cursor={false}
              />
              <Pie
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      innerRadius={outerRadius + 12}
                      outerRadius={outerRadius + 25}
                    />
                  </g>
                )}
                data={categoryStats}
                dataKey="totalAmount"
                innerRadius={75}
                nameKey="categoryId"
                strokeWidth={5}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
