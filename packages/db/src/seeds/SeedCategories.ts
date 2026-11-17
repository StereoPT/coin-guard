/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { CategoryFactory } from "../factories/categories";
import { prisma } from "../prisma";

const CATEGORY_OVERRIDES = [
  { name: "Groceries" },
  { name: "Rent" },
  { name: "Utilities" },
  { name: "Transport" },
  { name: "Dining Out" },
  { name: "Health" },
  { name: "Entertainment" },
  { name: "Shopping" },
  { name: "Travel" },
  { name: "Subscriptions" },
  { name: "Salary", budgetAmount: null },
];

export const CreateCategories = async () => {
  console.log("📋 Creating categories...");

  const fakerCategories = CategoryFactory.createMany(
    CATEGORY_OVERRIDES.length,
    CATEGORY_OVERRIDES,
  );

  const categories = await prisma.category.createManyAndReturn({
    data: fakerCategories,
    skipDuplicates: true,
  });

  console.log(
    `✅ Created ${categories.length} of ${fakerCategories.length} categories`,
  );
  console.log();

  return categories;
};
