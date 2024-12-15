import type { Metadata } from 'next';
import './globals.css';

import GlobalProviders from '@/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/components/navbar/Navbar';

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
          <Navbar />
          <main className="w-full">{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </GlobalProviders>
      </body>
    </html>
  );
}
