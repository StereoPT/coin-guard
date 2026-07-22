import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/providers/AppProviders";
import { cn, Toaster } from "@coin-guard/ui";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Coin Guard",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html className={cn("antialiased", "font-sans", inter.variable)} lang="en">
      <body>
        <NextTopLoader color="#009689" showSpinner={false} />
        <AppProviders>{children}</AppProviders>
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
