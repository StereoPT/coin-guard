import { defineConfig, devices } from "@playwright/test";
import { BASE_URL, E2E_PORT } from "./src/env";
import { assertSafeDatabaseUrl } from "./src/guard";

const { url: databaseUrl } = assertSafeDatabaseUrl(
  process.env.E2E_DATABASE_URL,
);

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./src/globalSetup.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm --filter @coin-guard/db build && pnpm --filter @coin-guard/web exec next dev -p ${E2E_PORT}`,
    cwd: "../..",
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      DATABASE_URL: databaseUrl,
      NODE_ENV: "development",
      NEXT_DIST_DIR: ".next-e2e",
    },
  },
});
