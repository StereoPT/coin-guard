import { execFileSync } from "node:child_process";
import { Client } from "pg";
import { REPO_ROOT } from "./env";
import { assertSafeDatabaseUrl } from "./guard";

export async function ensureDatabase(rawUrl: string | undefined) {
  const { adminUrl, databaseName } = assertSafeDatabaseUrl(rawUrl);
  const admin = new Client({ connectionString: adminUrl });
  await admin.connect();

  try {
    const { rowCount } = await admin.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [databaseName],
    );
    if (!rowCount) {
      await admin.query(
        `CREATE DATABASE "${databaseName.replace(/"/g, '""')}"`,
      );
    }
  } finally {
    await admin.end();
  }
}

export function migrateDatabase(rawUrl: string | undefined) {
  const { url } = assertSafeDatabaseUrl(rawUrl);
  execFileSync(
    "pnpm",
    [
      "--filter",
      "@coin-guard/db",
      "exec",
      "prisma",
      "migrate",
      "deploy",
      "--config",
      "prisma.config.ts",
    ],
    {
      cwd: REPO_ROOT,
      env: { ...process.env, DATABASE_URL: url },
      stdio: "inherit",
    },
  );
}

export async function resetDatabase(rawUrl: string | undefined) {
  const { url } = assertSafeDatabaseUrl(rawUrl);
  const client = new Client({ connectionString: url });
  await client.connect();

  try {
    const { rows } = await client.query<{ tablename: string }>(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'",
    );
    if (rows.length) {
      const tables = rows
        .map((row) => `"${row.tablename.replace(/"/g, '""')}"`)
        .join(", ");
      await client.query(`TRUNCATE ${tables} RESTART IDENTITY CASCADE`);
    }
  } finally {
    await client.end();
  }
}
