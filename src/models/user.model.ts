import { userSchema } from "../utils/schemas/user.schema";
import { z } from "zod";;

export type User = z.infer<typeof userSchema>;

export type AccountType = "admin" | "user";

export type UserRecord = {
    user_id: string;
    creation_time: number;
    email: string;
    name: string;
    surname: string;
    nick: string;
    status: boolean;
    birth_date: number;
    role: AccountType;
    profil_image?: string;
}

export type UserRecordTMP = {
    user_id: string;
    email: string;
    name: string;
    surname: string;
    nick: string;
    uid: string;
    birth_date: string;
}