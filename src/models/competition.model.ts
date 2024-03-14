import { z } from "zod";

const competitionLocation = require("../utils/schemas/competition.schema");

const competitionSchema = require("../utils/schemas/competition.schema");

export type CompetitionLocation = z.infer<typeof competitionLocation>;

export type Competition = z.infer<typeof competitionSchema>;
