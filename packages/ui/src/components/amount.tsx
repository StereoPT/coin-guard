import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "@coin-guard/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const amountVariants = cva(
  "group/amount inline-flex w-fit shrink-0 items-center align-middle gap-1 tabular-nums text-xs font-semibold whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-4!",
  {
    variants: {
      variant: {
        DEBIT: "text-red-600",
        CREDIT: "text-green-600",
        TRANSFER: "text-slate-600",
      }
    },
    defaultVariants: {
      variant: "DEBIT"
    }
  }
);


function Amount({
  className,
  variant = "DEBIT",
  render,
  ...props
}: useRender.ComponentProps<"span" >& VariantProps<typeof amountVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(amountVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: "amount",
      variant
    }
  });
}

export { Amount };
