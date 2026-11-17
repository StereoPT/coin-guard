/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { faker } from "@faker-js/faker";
import { LookupCategoryFactory } from "../factories/lookupCategories";
import type { Category } from "../generated/prisma/client";
import { prisma } from "../prisma";

export const CreateLookupCategories = async (categories: Category[]) => {
  console.log("🔎 Creating lookup categories...");

  const data = LookupCategoryFactory.createMany(
    faker.number.int({ min: 5, max: 15 }),
    () => ({
      categoryId: faker.helpers.arrayElement(categories).id,
    }),
  );

  const { count } = await prisma.lookupCategory.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${count} of ${data.length} lookup categories`);
  console.log();

  return count;
};
