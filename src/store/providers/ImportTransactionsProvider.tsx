"use client";

import { Provider } from "jotai";
import type { ReactNode } from "react";

type ImportTransactionsProviderProps = {
  children: ReactNode;
};

export const ImportTransactionsProvider = ({
  children,
}: ImportTransactionsProviderProps) => {
  return <Provider>{children}</Provider>;
};
