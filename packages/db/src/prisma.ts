import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "./generated/prisma/client";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const normalizeDatabaseUrl = (url: string) => {
  if (!url.startsWith("file:")) {
    return url;
  }

  const databasePath = url.slice("file:".length);
  return `file:${path.resolve(packageRoot, databasePath)}`;
};

const configuredDatabaseUrl = process.env.DATABASE_URL;

if (!configuredDatabaseUrl) {
  throw new Error("DATABASE_URL is required to initialize @coin-guard/db");
}

export const databaseUrl = normalizeDatabaseUrl(configuredDatabaseUrl);

export const getDatabaseFilePath = () => {
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Database export only supports sqlite file URLs");
  }

  return databaseUrl.slice("file:".length);
};

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
