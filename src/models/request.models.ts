import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { Request } from "express";

export type AuthorizedRequest = Request & { userDetails?: DecodedIdToken };
