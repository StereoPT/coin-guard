import pkg from "../../package.json";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@coin-guard/ui", "@coin-guard/db"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
