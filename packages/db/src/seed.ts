/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { CreateCategories } from "./seeds/SeedCategories";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");
  console.log();

  try {
    // Create Categories
    await CreateCategories();

    console.log("🎉 Database seeding completed successfully!");
    console.log();
    console.log();

    // Print summary
    const summary = {
      categories: await prisma.category.count(),
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
