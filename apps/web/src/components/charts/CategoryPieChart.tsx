"use client";

import { CategoryChartDialog } from "@/components/charts/CategoryChartDialog";
import { formatCurrency } from "@/lib/formatter";
import type { CategoryStats } from "@/types/categories";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@coin-guard/ui";
import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

type CategoryPieChartProps = {
  categoryStats: CategoryStats[];
};

export const CategoryPieChart = ({ categoryStats }: CategoryPieChartProps) => {
  const id = "analytics-categories";
  const [openDialog, setOpenDialog] = useState(false);

  const pieData = useMemo(() => categoryStats.slice(0, 5), [categoryStats]);

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

    pieData.forEach((stat, index) => {
      config[stat.categoryId] = {
        label: stat.categoryName,
        color: colors[index % colors.length],
      };
    });

    return config;
  }, [pieData]);

  return (
    <>
      {openDialog && (
        <CategoryChartDialog
          categoryStats={categoryStats}
          onOpenChange={setOpenDialog}
          open={openDialog}
        />
      )}

      <Card className="h-full flex flex-col" data-chart={id}>
        <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1">
            <CardTitle>Expenses Categories</CardTitle>
            <CardDescription>Category breakdown of expenses</CardDescription>
          </div>
          <CardAction>
            <Button
              onClick={() => setOpenDialog(true)}
              size="sm"
              variant="outline"
            >
              <Eye />
              View All
            </Button>
          </CardAction>
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
                  data={pieData}
                  dataKey="totalAmount"
                  innerRadius={75}
                  nameKey="categoryId"
                  strokeWidth={5}
                >
                  {pieData.map((entry) => (
                    <Cell
                      fill={`var(--color-${entry.categoryId})`}
                      key={entry.categoryId}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
