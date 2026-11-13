"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@coin-guard/ui";
import Image from "next/image";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <Empty className="border border-dashed max-w-2xl mx-auto">
      <EmptyHeader>
        <EmptyMedia>
          <Image
            alt="CoinGuard mascot"
            className="h-auto w-20"
            height={540}
            src="/CoinGuard-small.png"
            width={512}
          />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  );
};
