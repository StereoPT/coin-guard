"use client";

import { ROUTES } from "@/constants/routes";
import { Button } from "@coin-guard/ui";
import { ArrowLeft, RefreshCw } from "@coin-guard/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7.25rem)] w-full p-4">
      <div className="flex flex-col items-center text-center">
        <Image
          alt="CoinGuard mascot holding an error sign"
          className="mb-6 h-auto w-48"
          height={539}
          priority
          src="/CoinGuard-error-small.png"
          width={512}
        />
        <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Something hit a snag, but it wasn&apos;t your budget.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => reset()} size="lg">
            <RefreshCw />
            Try again
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.home} />}
            size="lg"
            variant="outline"
          >
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
