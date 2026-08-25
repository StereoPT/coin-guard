import type { Button } from "@coin-guard/ui";
import type {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

export type WithTrigger =
  | {
      trigger: true;
      triggerVariant?: ComponentProps<typeof Button>["variant"];
      triggerLabel?: string;
      triggerIcon?: ReactNode;
      open?: boolean;
      onOpenChange?: Dispatch<SetStateAction<boolean>>;
    }
  | {
      trigger?: never;
      triggerVariant?: never;
      triggerLabel?: never;
      triggerIcon?: never;
      open: boolean;
      onOpenChange: Dispatch<SetStateAction<boolean>>;
    };
