"use client";

import { getQueryClient } from "@/lib/getQueryClient";
import { SidebarProvider } from "@coin-guard/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <SidebarProvider>
        {children}
        <ReactQueryDevtools />
      </SidebarProvider>
    </QueryClientProvider>
  );
};
