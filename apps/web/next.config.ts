import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "../../package.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  output: "standalone",
  outputFileTracingRoot: path.join(dirname, "../.."),
  transpilePackages: ["@coin-guard/parser", "@coin-guard/ui"],
  serverExternalPackages: ["@coin-guard/db", "@prisma/client"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
