import { ExtendedError } from "socket.io/dist/namespace";
import { ERROR_CODES } from "../utils/errors/errorCodes.error";
import * as log4js from "log4js";
import { GeoPoint } from "firebase-admin/firestore";


export type Logger = log4js.Logger;
export type NextSocketFunction = (err?: ExtendedError) => void;
export type ErrorCodes = typeof ERROR_CODES;
export type ErrorCodesKeys = keyof ErrorCodes;

export type Position = {
  latitude: number;
  longtitude: number;
};
