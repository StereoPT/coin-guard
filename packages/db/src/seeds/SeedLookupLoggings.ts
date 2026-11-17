/** biome-ignore-all lint/suspicious/noConsole: Required for Logging */

import { faker } from "@faker-js/faker";
import { LookupLoggingFactory } from "../factories/lookupLoggings";
import { prisma } from "../prisma";

export const CreateLookupLoggings = async () => {
  console.log("📝 Creating lookup logs...");

  const { count } = await prisma.lookupLogging.createMany({
    data: LookupLoggingFactory.createMany(
      faker.number.int({ min: 5, max: 25 }),
    ),
  });

  console.log(`✅ Created ${count} lookup logs`);
  console.log();

  return count;
};
