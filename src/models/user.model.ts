import { userSchema } from "../utils/schemas/user.schema";
import { z } from "zod";;

export type User = z.infer<typeof userSchema>;