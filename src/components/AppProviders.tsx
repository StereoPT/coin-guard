'use client';

import { ReactNode, useState } from 'react';
import { SidebarProvider } from './ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        {children}
        <ReactQueryDevtools />
      </SidebarProvider>
    </QueryClientProvider>
  );
};
