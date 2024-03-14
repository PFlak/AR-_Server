import { z } from "zod";

const userSchema = require("../utils/schemas/user.schema");

export type User = z.infer<typeof userSchema>;
