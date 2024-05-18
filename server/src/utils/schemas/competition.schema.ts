import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const competitionLocation = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const competitionSchema = z.object({
  competition_id: z.string({ required_error: "competition_id is required" }),
  name: z.string().min(4, { message: "name is too short" }).optional(),
  description: z.string().optional(),
  start_time: z.instanceof(Timestamp),
  end_time: z.instanceof(Timestamp),
  start_location: competitionLocation.optional(),
  image_path: z.string().optional(),
  // TODO: competition_options
});

export const competitionIdParser = z.string().min(1);
