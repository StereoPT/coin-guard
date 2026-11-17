import { faker } from "@faker-js/faker";
import {
  type LookupLogging,
  LoggingType,
  LookupField,
} from "../generated/prisma/client";
import { buildFactory } from "../utils/buildFactory";

type FactoryLookupLogging = Omit<
  LookupLogging,
  "id" | "createdAt" | "updatedAt"
>;

export const LookupLoggingFactory = buildFactory<FactoryLookupLogging>(() => ({
  type: LoggingType.ERROR,
  lookupField: faker.helpers.enumValue(LookupField),
  description: faker.company.name().toUpperCase(),
}));
