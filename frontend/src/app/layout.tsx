import type { Metadata } from 'next';
import './globals.css';

import GlobalProviders from '@/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: 'Coin Guard',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalProviders>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </GlobalProviders>
      </body>
    </html>
  );
}
