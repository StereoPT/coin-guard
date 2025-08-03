'use client';

import { DisplayCard } from '@/components/DisplayCard';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Skeleton } from '@/components/ui/skeleton';
import { useStatCards } from '@/hooks/analytics/useStatCards';
import {
  ArrowBigDown,
  ArrowBigUp,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from 'lucide-react';

const LoadingStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
  );
};

export const StatCards = () => {
  const { data: stats, isLoading } = useStatCards();

  if (isLoading) {
    return <LoadingStats />;
  }

  if (!stats) {
    return <ErrorAlert />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <DisplayCard title="Credit" icon={BanknoteArrowUp}>
        <div className="flex gap-2 items-center text-2xl font-bold text-green-600">
          <ArrowBigUp size={32} /> {stats.CREDIT.toFixed(2)}€
        </div>
      </DisplayCard>
      <DisplayCard title="Debit" icon={BanknoteArrowDown}>
        <div className="flex gap-2 items-center text-2xl font-bold text-red-600">
          <ArrowBigDown size={32} /> {stats.DEBIT.toFixed(2)}€
        </div>
      </DisplayCard>
    </div>
  );
};
