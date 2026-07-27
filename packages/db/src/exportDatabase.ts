import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import { databaseUrl } from "./prisma";

// Prisma's connection string carries a `?schema=` query param that pg_dump
// doesn't understand ("invalid URI query parameter: schema")
const toPgDumpUrl = (url: string) => {
  const parsed = new URL(url);
  parsed.searchParams.delete("schema");
  return parsed.toString();
};

export const exportDatabase = async () => {
  const timestamp = Date.now();

  const filePath = `/tmp/backup_${timestamp}.sql`;
  const dump = execFileSync(
    "pg_dump",
    [toPgDumpUrl(databaseUrl), "--no-owner", "--no-privileges"],
    { maxBuffer: 1024 * 1024 * 1024 },
  );

  fs.writeFileSync(filePath, dump);
  const filename = `database_backup_${timestamp}.sql`;

  const downloadToken = crypto.randomBytes(32).toString("hex");
  const tokenPath = `/tmp/token_${downloadToken}.json`;

  fs.writeFileSync(
    tokenPath,
    JSON.stringify({
      filePath,
      filename,
      contentType: "application/sql",
      timestamp: Date.now(),
    }),
  );

  return {
    success: true,
    downloadToken,
    filename,
  };
};
