/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { CreateBankAccounts } from "./seeds/SeedBankAccounts";
import { CreateCategories } from "./seeds/SeedCategories";
import { CreateLookupCategories } from "./seeds/SeedLookupCategories";
import { CreateLookupDescriptions } from "./seeds/SeedLookupDescriptions";
import { CreateLookupLoggings } from "./seeds/SeedLookupLoggings";
import { CreateTransactions } from "./seeds/SeedTransactions";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");
  console.log();

  try {
    // Create Categories
    const categories = await CreateCategories();

    // Create Bank Accounts
    const bankAccounts = await CreateBankAccounts();

    // Create Transactions
    await CreateTransactions(categories, bankAccounts);

    // Create Lookups
    await CreateLookupCategories(categories);
    await CreateLookupDescriptions();
    await CreateLookupLoggings();

    console.log("🎉 Database seeding completed successfully!");
    console.log();
    console.log();

    // Print summary
    const summary = {
      categories: await prisma.category.count(),
      bankAccounts: await prisma.bankAccount.count(),
      transactions: await prisma.transaction.count(),

      lookupCategories: await prisma.lookupCategory.count(),
      lookupDescriptions: await prisma.lookupDescription.count(),
      lookupLoggings: await prisma.lookupLogging.count(),
    };

    console.log("📊 Database summary:");
    console.table(summary);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
