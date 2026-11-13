import { ROUTES } from "@/constants/routes";
import { Button } from "@coin-guard/ui";
import { ArrowLeft } from "@coin-guard/ui/icons";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <div className="flex flex-col items-center text-center">
        <Image
          alt="CoinGuard mascot"
          className="mb-6 h-auto w-40"
          height={540}
          priority
          src="/CoinGuard-small.png"
          width={512}
        />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
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
