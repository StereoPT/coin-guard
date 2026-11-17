import { faker } from "@faker-js/faker";
import type { LookupCategory } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryLookupCategory = Omit<
  LookupCategory,
  "id" | "createdAt" | "updatedAt"
>;

export const LookupCategoryFactory = buildFactory<FactoryLookupCategory>(
  () => ({
    description: faker.company.name().toUpperCase(),
    categoryId: faker.string.uuid(),
    enabled: true,
  }),
);
