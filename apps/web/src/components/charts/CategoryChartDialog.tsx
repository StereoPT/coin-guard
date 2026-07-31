"use client";

import { formatCurrency } from "@/lib/formatter";
import type { CategoryStats } from "@/types/categories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Field,
  FieldLabel,
  Progress,
} from "@coin-guard/ui";
import type { Dispatch, SetStateAction } from "react";

type CategoryChartDialogProps = {
  categoryStats: CategoryStats[];
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const CategoryChartDialog = ({
  open,
  onOpenChange,
  categoryStats,
}: CategoryChartDialogProps) => {
  const maxValue = Math.max(
    ...categoryStats.map((stat) => stat.totalAmount),
    ...categoryStats.map((stat) => stat.budgetAmount ?? 0),
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="min-w-2xl!">
        <DialogHeader>
          <DialogTitle>Categories Breakdown</DialogTitle>
          <DialogDescription>
            Breakdown of expenses by category
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto pr-3">
          {categoryStats.map((stat) => {
            const budgetPosition =
              stat.budgetAmount !== null
                ? (stat.budgetAmount / maxValue) * 100
                : null;

            return (
              <Field className="w-full my-6" key={stat.categoryId}>
                <FieldLabel htmlFor={`progress-upload-${stat.categoryId}`}>
                  <span>{stat.categoryName}</span>
                  <span className="ml-auto">
                    {formatCurrency(stat.totalAmount)}
                  </span>
                </FieldLabel>
                <div className="relative">
                  <Progress
                    id={`progress-upload-${stat.categoryId}`}
                    value={(stat.totalAmount / maxValue) * 100}
                  />
                  {budgetPosition !== null && budgetPosition <= 100 && (
                    <div
                      className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-foreground/70"
                      style={{ left: `${budgetPosition}%` }}
                      title={`Budget: ${formatCurrency(stat.budgetAmount ?? 0)}`}
                    />
                  )}
                </div>
              </Field>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
