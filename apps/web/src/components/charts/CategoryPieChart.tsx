"use client";

import { CategoryChartDialog } from "@/components/charts/CategoryChartDialog";
import { CurrencyTooltipContent } from "@/components/charts/CurrencyTooltipContent";
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
} from "@coin-guard/ui";
import {
  Cell,
  Pie,
  PieChart,
  type PieSectorDataItem,
  Sector,
} from "@coin-guard/ui/charts";
import { Eye } from "@coin-guard/ui/icons";
import { useMemo, useState } from "react";

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
              disabled={categoryStats.length === 0}
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
          {categoryStats.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No expenses in this period.
            </p>
          ) : (
            <div className="flex h-full w-full justify-center">
              <ChartStyle config={chartConfig} id={id} key={id} />
              <ChartContainer
                className="mx-auto aspect-square min-h-32"
                config={chartConfig}
                id={id}
              >
                <PieChart>
                  <ChartTooltip
                    content={<CurrencyTooltipContent hideLabel />}
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
                    nameKey="categoryName"
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
          )}
        </CardContent>
      </Card>
    </>
  );
};
