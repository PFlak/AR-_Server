import { ErrorWithCode } from "../../common/common.error.config";

export class InvalidTokenError extends ErrorWithCode {
    constructor(){
        super("Invalid Token", 403, "INVALID_TOKEN");
    }
}

export class CompetitionNotFoundError extends ErrorWithCode {
    constructor() {
      super("Competition not found", 404, "COMPETITION_NOT_FOUND_ERROR");
    }
}