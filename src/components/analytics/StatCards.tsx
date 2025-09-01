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
        iconColor="text-green-600"
        stat={stats?.CREDIT}
        title="Income"
      />
      <StatCard
        icon={BanknoteArrowDown}
        iconColor="text-red-600"
        stat={stats?.DEBIT}
        title="Debit"
      />
      <StatCard
        icon={Banknote}
        iconColor="text-blue-600"
        stat={stats?.CASH_FLOW}
        title="Cash Flow"
      />
    </div>
  );
};
