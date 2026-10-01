"use client";

import { Button } from "@coin-guard/ui";
import { ChevronLeft } from "@coin-guard/ui/icons";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  goBack?: boolean;
  actions?: ReactNode;
};

export const PageHeader = ({
  title,
  description,
  goBack = false,
  actions,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 items-center">
        {goBack && (
          <Button onClick={() => router.back()} size="icon" variant="outline">
            <ChevronLeft />
          </Button>
        )}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions}
    </div>
  );
};
