import firebase from "firebase-admin";
import { z } from "zod";

export const yachtCategorieSchema = z.object({
    yacht_cat_id: z.string(),
    name: z.string(),
    short_name: z.string(),
    description: z.string(),
    created_at: z.instanceof(firebase.firestore.Timestamp).optional(),
    updated_at: z.instanceof(firebase.firestore.Timestamp).optional()
    // options: ;//TODO
});
