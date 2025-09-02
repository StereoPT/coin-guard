"use server";

import { config } from "@/constants";
import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";

export const ExportDatabase = async () => {
  try {
    const timestamp = Date.now();
    const dbPath = config.databasePath;

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
  } catch (error) {
    console.error("Export failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
