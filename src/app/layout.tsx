import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { AppProviders } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coin Guard',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>
        <NextTopLoader color="#2b7fff" showSpinner={false} />
        <AppProviders>{children}</AppProviders>
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
