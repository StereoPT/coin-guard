'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from './ui/sidebar';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
