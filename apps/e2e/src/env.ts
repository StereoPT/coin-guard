import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
export const E2E_ROOT = path.join(dirname, "..");
export const REPO_ROOT = path.join(E2E_ROOT, "../..");

const envFile = path.join(E2E_ROOT, ".env.e2e");
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

export const E2E_PORT = Number(process.env.E2E_PORT ?? 3100);
export const BASE_URL = `http://localhost:${E2E_PORT}`;
