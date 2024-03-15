import { ERROR_CODES } from "../utils/errors/errorCodes.error";
import * as log4js from "log4js";


export type Logger = log4js.Logger;

export type ErrorCodes = typeof ERROR_CODES;
export type ErrorCodesKeys = keyof ErrorCodes;