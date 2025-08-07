'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PageHeaderProps = {
  title: string;
  description?: string;
  goBack?: boolean;
};

export const PageHeader = ({
  title,
  description,
  goBack = false,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      {goBack && (
        <Button size="icon" variant="outline" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
      )}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};
