import { faker } from "@faker-js/faker";
import type { Category } from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryCategory = Omit<Category, "id" | "createdAt" | "updatedAt">;

export const CategoryFactory = buildFactory<FactoryCategory>(() => ({
  name: faker.commerce.department(),
  budgetAmount:
    faker.helpers.maybe(() =>
      faker.number.float({ min: 50, max: 1500, fractionDigits: 2 }),
    ) ?? null,
}));
