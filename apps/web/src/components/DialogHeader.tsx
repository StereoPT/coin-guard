"use client";

import {
  DialogDescription,
  DialogTitle,
  DialogHeader as ShadcnDialogHeader,
} from "@coin-guard/ui";
import { Separator } from "@coin-guard/ui";
import { cn } from "@coin-guard/ui";
import type { LucideIcon } from "lucide-react";

type DialogHeaderProps = {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;

  titleClassName?: string;
  subtitleClassName?: string;
  iconClassName?: string;
};

export const DialogHeader = ({
  title,
  subtitle,
  icon,
  titleClassName,
  subtitleClassName,
  iconClassName,
}: DialogHeaderProps) => {
  const Icon = icon;

  return (
    <ShadcnDialogHeader>
      <DialogTitle asChild>
        <div className="flex gap-4 px-4 items-center">
          {Icon && (
            <Icon className={cn("stroke-primary", iconClassName)} size={30} />
          )}
          <div>
            {title && (
              <p className={cn("text-xl text-primary", titleClassName)}>
                {title}
              </p>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </DialogTitle>
      <DialogDescription />
      <Separator />
    </ShadcnDialogHeader>
  );
};
