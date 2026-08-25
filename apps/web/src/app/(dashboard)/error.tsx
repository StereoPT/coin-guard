"use client";

import { ROUTES } from "@/constants/routes";
import { Button } from "@coin-guard/ui";
import { ArrowLeft, RefreshCw } from "@coin-guard/ui/icons";
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">Error</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Please try again later.
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
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        If you believe this is an error, please contact our support team.
      </footer>
    </div>
  );
};

export default ErrorPage;
