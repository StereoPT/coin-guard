import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import pkg from "../../package.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(dirname, "../.."),
  // Next's standalone-output tracer drops @swc/helpers' esm/ dir even though the
  // SWC-transformed output requires it at runtime (only cjs/ gets traced) — force-include it.
  outputFileTracingIncludes: {
    "/**": ["../../node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/**"],
  },
  transpilePackages: ["@coin-guard/ui"],
  serverExternalPackages: ["@coin-guard/db", "@prisma/client"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
