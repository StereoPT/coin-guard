import { formatCurrency } from "@/lib/formatter";
import { ChartTooltipContent } from "@coin-guard/ui";
import type { ComponentProps } from "react";

type CurrencyTooltipContentProps = Omit<
  ComponentProps<typeof ChartTooltipContent>,
  "formatter"
>;

export const CurrencyTooltipContent = (props: CurrencyTooltipContentProps) => (
  <ChartTooltipContent
    {...props}
    formatter={(value, name, item) => (
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-xs"
            style={{ backgroundColor: item.payload?.fill ?? item.color }}
          />
          <span className="text-muted-foreground capitalize">{name}</span>
        </div>
        <span className="font-mono font-medium text-foreground tabular-nums">
          {formatCurrency(Number(value))}
        </span>
      </div>
    )}
  />
);
