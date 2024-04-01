import { yachtCategorieSchema } from "../utils/schemas/yachtCategorie.schema";
import { z } from "zod";

export type YachtCategorie = z.infer<typeof yachtCategorieSchema>;
