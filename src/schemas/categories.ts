import { z } from 'zod';

export const addCategorySchema = z.object({
  name: z.string().trim().nonempty(),
});

export const editCategorySchema = addCategorySchema.partial();

export type addCategorySchemaType = z.infer<typeof addCategorySchema>;
export type editCategorySchemaType = z.infer<typeof editCategorySchema>;
