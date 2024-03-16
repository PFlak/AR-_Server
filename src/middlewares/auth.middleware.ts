import type { AuthorizedRequest } from "../models/request.models";
import type { Response, NextFunction } from "express";
import type { Logger } from "../models/common.models";
import { internalServerErrorResponse } from "../utils/errors/internalServerError.error";
import { FirebaseHelper } from "../utils/firebase/firebaseHelper";;
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

    async verifyUserMiddleware(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization!.split(" ")[1] as string;

            if(!token){
                throw new InvalidTokenError()
            }

            //TODO should implement correct type
            const decodedValue = await FirebaseHelper.verifyToken(token) as unknown as any;

            if (!decodedValue) {
                throw new InvalidTokenError();
            }
            
            req.user = decodedValue;
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
