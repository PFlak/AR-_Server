import { competitionTeamSchema } from "../utils/schemas/competitionTeam.schema";
import { z } from "zod";;

export type CompetitionTeam = z.infer<typeof competitionTeamSchema>;