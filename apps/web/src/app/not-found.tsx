import { ROUTES } from "@/constants/routes";
import { Button } from "@coin-guard/ui";
import { ArrowLeft } from "@coin-guard/ui/icons";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7.25rem)] w-full p-4">
      <div className="flex flex-col items-center text-center">
        <Image
          alt="CoinGuard mascot holding a 404 sign"
          className="mb-6 h-auto w-48"
          height={563}
          priority
          src="/CoinGuard-404-small.png"
          width={512}
        />
        <h1 className="text-2xl font-semibold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          We guard coins, not every URL. This one got away.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.home} />}
            size="lg"
          >
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
