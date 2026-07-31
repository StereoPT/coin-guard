import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import pkg from "../../package.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(dirname, "../.."),
  transpilePackages: ["@coin-guard/ui"],
  serverExternalPackages: ["@coin-guard/db", "@prisma/client"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
