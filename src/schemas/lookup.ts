import { z } from "zod";

export const addLookupCategorySchema = z.object({
  description: z.string().trim().nonempty(),
  categoryId: z.string().trim(),
  enabled: z.boolean(),
});

export const editLookupCategorySchema = addLookupCategorySchema.partial();

export type addLookupCategorySchemaType = z.infer<
  typeof addLookupCategorySchema
>;
export type editLookupCategorySchemaType = z.infer<
  typeof editLookupCategorySchema
>;
