import { ensureDatabase, migrateDatabase, resetDatabase } from "./database";
import "./env";

export default async function globalSetup() {
  const url = process.env.E2E_DATABASE_URL;
  await ensureDatabase(url);
  migrateDatabase(url);
  await resetDatabase(url);
}
