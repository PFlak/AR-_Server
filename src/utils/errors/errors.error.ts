import { ErrorWithCode } from "../../common/common.error.config";

export class InvalidTokenError extends ErrorWithCode {
    constructor(){
        super("Invalid Token", 403, "INVALID_TOKEN");
    }
}

export class UserNotFoundError extends ErrorWithCode {
    constructor() {
      super("User not found", 404, "USER_NOT_FOUND_ERROR");
    }
}