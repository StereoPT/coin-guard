import type { NextConfig } from "next";
import pkg from "../../package.json";

const nextConfig: NextConfig = {
  transpilePackages: ["@coin-guard/ui"],
  serverExternalPackages: ["@coin-guard/db", "@prisma/client"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
