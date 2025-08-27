"use client";

import type { LucideIcon } from "lucide-react";
import { DialogTitle, DialogHeader as ShadcnDialogHeader } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

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
        <div className="flex gap-4 px-4 mb-2 items-center">
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
      <Separator />
    </ShadcnDialogHeader>
  );
};
