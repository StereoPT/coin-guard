const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
const E2E_DB_SUFFIX = "_e2e";

export type SafeDatabase = {
  url: string;
  databaseName: string;
  adminUrl: string;
};

export const assertSafeDatabaseUrl = (
  rawUrl: string | undefined,
): SafeDatabase => {
  if (process.env.CI) {
    throw new Error("E2E tests are local-only and must never run on CI.");
  }

  if (!rawUrl) {
    throw new Error(
      "E2E_DATABASE_URL is not set. Copy apps/e2e/.env.example to apps/e2e/.env.e2e.",
    );
  }

  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("E2E_DATABASE_URL is not a valid URL.");
  }

  if (!LOCAL_HOSTS.has(url.hostname)) {
    throw new Error(
      `Refusing to run: E2E database host "${url.hostname}" is not local.`,
    );
  }

  const databaseName = decodeURIComponent(url.pathname.slice(1));
  if (!databaseName.endsWith(E2E_DB_SUFFIX)) {
    throw new Error(
      `Refusing to run: E2E database name "${databaseName}" must end in "${E2E_DB_SUFFIX}".`,
    );
  }

  const admin = new URL(rawUrl);
  admin.pathname = "/postgres";

  return { url: rawUrl, databaseName, adminUrl: admin.toString() };
};
