"use client";

import { getQueryClient } from "@/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { SidebarProvider } from "../components/ui/sidebar";

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
