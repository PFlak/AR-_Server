import { competitionTeamSchema } from "../utils/schemas/competitionTeams.schema";
import { z } from "zod";;

export type CompetitionTeam = z.infer<typeof competitionTeamSchema>;