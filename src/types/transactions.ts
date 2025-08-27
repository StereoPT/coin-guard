import type { Prisma } from "@/generated/prisma";

export type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;
