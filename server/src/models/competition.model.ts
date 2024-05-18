import { competitionLocation } from "../utils/schemas/competition.schema";
import { competitionSchema } from "../utils/schemas/competition.schema";
import { z } from "zod";
import { YachtCategorie } from "./yachtCategorie.models";
import { Position } from "./common.models";

export type CompetitionLocation = z.infer<typeof competitionLocation>;

export type Competition = z.infer<typeof competitionSchema> & {
  yacht_categories: YachtCategorie<any>[];
  competition_teams: any;
  competition_stages: any;
};

export type CompetitionPositions = { 
  [key: string]: { // competition ID
    [key: string]: Position[]; // team ID and theirs positions
  }
};