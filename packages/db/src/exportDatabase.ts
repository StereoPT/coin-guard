import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import { getDatabaseFilePath } from "./prisma";

export const exportDatabase = async () => {
  const timestamp = Date.now();
  const dbPath = getDatabaseFilePath();

  const filePath = `/tmp/backup_${timestamp}.sql`;
  execSync(`sqlite3 "${dbPath}" .dump > "${filePath}"`);
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
