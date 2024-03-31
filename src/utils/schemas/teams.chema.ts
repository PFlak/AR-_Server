import firebase from "firebase-admin";
import { z } from "zod";

export const teamSchema = z.object({
  country_short: z.string({ required_error: "Country short is required" }),
  name: z.string().min(3),
  team_number: z.number(),
  yacht_category: z.string(),
  created_at: z.instanceof(firebase.firestore.Timestamp).optional(),
  updated_at: z.instanceof(firebase.firestore.Timestamp).optional()
});
