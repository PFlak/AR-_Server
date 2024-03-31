import { competitionLocation } from "../utils/schemas/competition.schema";
import { competitionSchema } from "../utils/schemas/competition.schema";
import { z } from "zod";
import { YachtCategories } from "./yachtCategories.models";

export type CompetitionLocation = z.infer<typeof competitionLocation>;

export type Competition = z.infer<typeof competitionSchema> & {
  yacht_categories: YachtCategories<any>[];
  competition_teams: any;
  competition_stages: any;
};
