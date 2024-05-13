import { z } from "zod";

export const yachtCategorieSchema = z.object({
    yacht_cat_id: z.string(),
    name: z.string(),
    short_name: z.string(),
    description: z.string(),
    // options: ;//TODO
});
