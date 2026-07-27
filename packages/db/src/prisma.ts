import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const configuredDatabaseUrl = process.env.DATABASE_URL;

if (!configuredDatabaseUrl) {
  throw new Error("DATABASE_URL is required to initialize @coin-guard/db");
}

export const databaseUrl = configuredDatabaseUrl;

const adapter = new PrismaPg({ connectionString: databaseUrl });

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
