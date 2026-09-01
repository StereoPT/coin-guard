import { CountUpWrapper } from "@/components/CountUpWrapper";
import type { TransactionStat } from "@/types/analytics";
import type { CountType } from "@/types/dashboard";
import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@coin-guard/ui";
import {
  EqualApproximately,
  TrendingDown,
  TrendingUp,
} from "@coin-guard/ui/icons";

type StatCardProps = {
  title: string;
  stat: TransactionStat;
  subfooter: string;
  countType: CountType;
};

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  flat: EqualApproximately,
} as const;

const TREND_LABEL = {
  up: "Trending up",
  down: "Trending down",
  flat: "No trend",
} as const;

export const StatCard = ({
  title,
  stat,
  subfooter,
  countType,
}: StatCardProps) => {
  const { trend } = stat;
  const TrendIcon = trend ? TREND_ICON[trend] : null;

  return (
    <Card className="from-primary/5 to-card bg-linear-to-t">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          <CountUpWrapper type={countType} value={stat.value} />
        </CardTitle>
        <CardAction>
          {TrendIcon && stat.percentage != null && (
            <Badge variant="outline">
              {trend === "up" && "+"}
              {stat.percentage.toFixed(2)}%
              <TrendIcon />
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        {TrendIcon && trend && (
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            {TREND_LABEL[trend]}
            <TrendIcon className="size-4" />
          </div>
        )}
        <div className="text-muted-foreground">{subfooter}</div>
      </CardFooter>
    </Card>
  );
};
