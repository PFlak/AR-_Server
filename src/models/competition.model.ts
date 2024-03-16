import { competitionLocation } from "../utils/schemas/competition.schema";
import { competitionSchema } from "../utils/schemas/competition.schema";
import { z } from "zod";

export type CompetitionLocation = z.infer<typeof competitionLocation>;

export type Competition = z.infer<typeof competitionSchema>;
