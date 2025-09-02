import type { TransactionStat } from "@/actions/analytics/getStats";
import { CountUpWrapper } from "@/components/CountUpWrapper";
import type { TransactionType } from "@/generated/prisma";
import { getTypeColor } from "@/lib/typeColors";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import type { ClassValue } from "clsx";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  type: TransactionType | "CASH_FLOW";
  showBadge?: boolean;
  stat?: TransactionStat;
  iconColor?: ClassValue;
  className?: ClassValue;
};

export const StatCard = ({
  icon,
  title,
  stat,
  type,
  showBadge = false,
  className,
}: StatCardProps) => {
  const Icon = icon;
  const isNegativePercentage = Math.sign(stat?.percentage ?? 0) < 1;

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center bg-secondary rounded-lg w-10 h-10">
          <Icon className={cn(getTypeColor(type))} size={30} />
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground font-medium text-sm">
            {title}
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold text-lg">
              {!stat ? (
                <Skeleton className="w-32 h-7" />
              ) : (
                <CountUpWrapper value={stat.value} />
              )}
            </div>
            {showBadge && (
              <Badge
                className={cn(getTypeColor(type, isNegativePercentage))}
                variant="secondary"
              >
                {stat?.percentage?.toFixed(2)}%
                {isNegativePercentage ? <TrendingDown /> : <TrendingUp />}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
