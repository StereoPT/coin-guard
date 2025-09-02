import { StatCard } from "@/components/analytics/StatCard";
import type { StatCardsType } from "@/types/analytics";
import { Banknote, BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

type StatCardsProps = {
  stats?: StatCardsType;
};

export const StatCards = ({ stats }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        icon={BanknoteArrowUp}
        stat={{ value: stats?.CREDIT ?? 0 }}
        title="Income"
        type="CREDIT"
      />
      <StatCard
        icon={BanknoteArrowDown}
        stat={{ value: stats?.DEBIT ?? 0 }}
        title="Debit"
        type="DEBIT"
      />
      <StatCard
        icon={Banknote}
        stat={{ value: stats?.CASH_FLOW ?? 0 }}
        title="Cash Flow"
        type="CASH_FLOW"
      />
    </div>
  );
};
