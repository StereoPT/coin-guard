/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { faker } from "@faker-js/faker";
import { LookupDescriptionFactory } from "../factories/lookupDescriptions";
import { prisma } from "../prisma";

export const CreateLookupDescriptions = async () => {
  console.log("🔤 Creating lookup descriptions...");

  const data = LookupDescriptionFactory.createMany(
    faker.number.int({ min: 5, max: 15 }),
  );

  const { count } = await prisma.lookupDescription.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${count} of ${data.length} lookup descriptions`);
  console.log();

  return count;
};
