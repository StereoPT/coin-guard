import type { NextConfig } from "next";
import pkg from "../../package.json";

const nextConfig: NextConfig = {
  transpilePackages: ["@coin-guard/ui"],
  serverExternalPackages: [
    "@coin-guard/db",
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
