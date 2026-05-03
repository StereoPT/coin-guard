"use server";

import { exportDatabase } from "@coin-guard/db/server";

export const ExportDatabase = async () => {
  try {
    return await exportDatabase();
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Export failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
