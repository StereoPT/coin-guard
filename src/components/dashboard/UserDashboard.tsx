'use client';

import { DisplayCard } from '@/components/dashboard/DisplayCard';
import { DisplayCategoryGraph } from '@/components/dashboard/DisplayCategoryGraph';
import { DisplayLastTransactions } from '@/components/dashboard/DisplayLastTransactions';
import { ErrorAlert } from '@/components/ErrorAlert';
import { TransactionType } from '@/generated/prisma';
import { useDashboardAnalytics } from '@/hooks/analytics/useDashboardAnalytics';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';

export const UserDashboard = () => {
  const { data: analytics } = useDashboardAnalytics();

  if (!analytics) {
    return <ErrorAlert />;
  }

  return (
    <div className="grid grid-cols-12 grid-rows-4 gap-4">
      <DisplayCard
        className="col-span-4 row-span-1"
        title="Income"
        icon={BanknoteArrowUp}
        type={TransactionType.CREDIT}
        stat={analytics.stats.CREDIT}
      />
      <DisplayCard
        className="col-span-4 row-span-1 col-start-5"
        title="Debit"
        icon={BanknoteArrowDown}
        type={TransactionType.DEBIT}
        stat={analytics.stats.DEBIT}
      />
      <DisplayCategoryGraph
        className="col-span-4 row-span-5 col-start-9"
        stats={analytics.categoryStats}
      />
      <DisplayLastTransactions
        className="col-span-8 row-span-4 row-start-2"
        transactions={analytics.lastFiveTransactions}
      />
    </div>
  );
};
