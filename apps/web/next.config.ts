import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@coin-guard/ui", "@coin-guard/db"],
};

export default nextConfig;
