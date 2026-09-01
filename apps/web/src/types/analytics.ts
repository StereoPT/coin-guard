export type Trend = "up" | "down" | "flat";

export type TransactionStat = {
  value: number;
  percentage?: number | null;
  trend?: Trend;
};
