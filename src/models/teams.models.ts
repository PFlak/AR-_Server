import { competitionTeamSchema } from "../utils/schemas/competitionTeam.schema";
import { teamSchema } from "../utils/schemas/teams.chema";;
import { z } from "zod";

export type CompetitionTeam = z.infer<typeof competitionTeamSchema>;

export type TeamRecord = z.infer<typeof teamSchema>;