import type { AuthorizedRequest } from "../models/request.models";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { Response, NextFunction } from "express";
import type { Logger } from "../models/common.models";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import { FirebaseHelper } from "../utils/helpers/firebaseHelper";;
import LoggerHelper from "../utils/logger";
import { InvalidTokenError } from "../utils/errors/errors.error";
import { ErrorWithCode } from "../common/common.error.config";

class AuthMiddleware {

    private logger!: Logger;

    constructor(){
        this.init();
    }

    private init(): void{

        this.initLogger();
    }

    private initLogger(): void{

        this.logger = LoggerHelper.getLogger("AuthMiddleware");
    }

    public verifyUserMiddleware = async (
        req: AuthorizedRequest,
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const token = req.headers.authorization!.split(" ")[1] as string;

            if(!token){
                throw new InvalidTokenError();
            }
            
            const decodedValue = await FirebaseHelper.verifyToken(token) as DecodedIdToken;

            if (!decodedValue) {
                throw new InvalidTokenError();
            }
            
            req.userDetails = decodedValue;
            next();
        } catch (error) {

            if(error instanceof ErrorWithCode){

                this.logger.fatal("Invalid Token");

                return res.status(error.status).json(error.toJSON());
            }
            
            this.logger.fatal("Internal Server Error at middleware!");

            return internalServerErrorResponse(res);
        }
    }
}

const instance = new AuthMiddleware();

export default instance;


