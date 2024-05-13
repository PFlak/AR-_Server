import type { ErrorCodesKeys } from "../models/common.models";
import { CommonRoutesConfig } from "./common.routes.config";

export abstract class ErrorWithCode extends Error {
    constructor(message: string, public status: number, public code: ErrorCodesKeys){
        super(message);
    }

    public toJSON() {
        return {
            status: CommonRoutesConfig.statusMessage.FAILED,
            message: this.message,
            code: this.code
        }
    }
}