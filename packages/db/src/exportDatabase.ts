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

// Matches the 10 minute token lifetime enforced by the download route
const EXPORT_MAX_AGE_MS = 10 * 60 * 1000;
const EXPORT_FILE_PATTERN = /^(backup_\d+\.sql|token_[a-f0-9]{64}\.json)$/;

// Dumps whose token was never redeemed would otherwise stay in /tmp forever
const removeStaleExports = () => {
  for (const name of fs.readdirSync("/tmp")) {
    if (!EXPORT_FILE_PATTERN.test(name)) continue;
    const path = `/tmp/${name}`;
    try {
      if (Date.now() - fs.statSync(path).mtimeMs > EXPORT_MAX_AGE_MS) {
        fs.unlinkSync(path);
      }
    } catch {
      // Already removed by a concurrent download: nothing to clean up
    }
  }
};

export const exportDatabase = async () => {
  removeStaleExports();
  const timestamp = Date.now();

  const filePath = `/tmp/backup_${timestamp}.sql`;
  const dump = execFileSync(
    "pg_dump",
    [toPgDumpUrl(databaseUrl), "--no-owner", "--no-privileges"],
    { maxBuffer: 1024 * 1024 * 1024 },
  );

  // The dump contains the full database: keep it readable by the owner only
  fs.writeFileSync(filePath, dump, { mode: 0o600 });
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
    { mode: 0o600 },
  );

  return {
    downloadToken,
    filename,
  };
};
