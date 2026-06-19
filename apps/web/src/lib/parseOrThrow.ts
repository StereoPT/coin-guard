"use server";

import type { ZodType } from "zod";

export const parseOrThrow = async <T>(
  schema: ZodType<T>,
  values: unknown,
): Promise<T> => {
  const { success, data } = await schema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  return data;
};
