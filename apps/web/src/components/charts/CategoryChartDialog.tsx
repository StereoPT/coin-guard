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
  const categoryAmountSum = categoryStats.reduce(
    (sum, stat) => sum + stat.totalAmount,
    0,
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
            return (
              <Field className="w-full my-6" key={stat.categoryId}>
                <FieldLabel htmlFor={`progress-upload-${stat.categoryId}`}>
                  <span>{stat.categoryName}</span>
                  <span className="ml-auto">
                    {formatCurrency(stat.totalAmount)}
                  </span>
                </FieldLabel>
                <Progress
                  id={`progress-upload-${stat.categoryId}`}
                  value={(stat.totalAmount / categoryAmountSum) * 100}
                />
              </Field>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
