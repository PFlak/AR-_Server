import { z } from "zod";

export const competitionTeamSchema = z.object({
    team_id: z.string(),
    competition_id: z.string(),
    country_sign: z.string(),
    name: z.string(),
    yach_cat_id: z.string(),
    // options: //TODO
});
