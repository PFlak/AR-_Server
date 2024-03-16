import { ErrorWithCode } from "../../common/common.error.config";

export class InvalidTokenError extends ErrorWithCode {
    constructor(){
        super("Invalid Token", 403, "INVALID_TOKEN");
    }
}