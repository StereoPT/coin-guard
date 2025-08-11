'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from './ui/sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/lib/getQueryClient';

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
