"use server";

import { exportDatabase } from "@coin-guard/db/server";

export const ExportDatabase = async () => {
  return exportDatabase();
};
