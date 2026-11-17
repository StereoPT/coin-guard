import { faker } from "@faker-js/faker";
import type { LookupDescription } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryLookupDescription = Omit<
  LookupDescription,
  "id" | "createdAt" | "updatedAt"
>;

export const LookupDescriptionFactory = buildFactory<FactoryLookupDescription>(
  () => {
    const company = faker.company.name();

    return {
      description: company.toLowerCase(),
      newDescription: company,
      enabled: true,
    };
  },
);
