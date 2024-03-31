import { NextFunction, Request, Response } from "express";
import { teamSchema } from "../utils/schemas/teams.chema";
import { ErrorWithCode } from "../common/common.error.config";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import { ZodError } from "zod";
import { validationErrorResponse } from "../utils/responses/validationErrorResponse.error";
import { FirebaseHelper } from "../utils/helpers/firebaseHelper";
import teamsManager from "../managers/teamsManager";
import { CommonRoutesConfig } from "../common/common.routes.config";


export const addNewTeamController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        let validatedData = await teamSchema.parseAsync(req.body);

        const currDate = await FirebaseHelper.getServerTimeStamp();

        validatedData.created_at = currDate;

        validatedData.updated_at = currDate

        await teamsManager.addNewTeam(validatedData);

        res.status(200).json({
            status: CommonRoutesConfig.statusMessage.SUCCESS,
            message: "Successfully added new team",
            result: {}
        });
    } catch(error) {
    
        if(error instanceof ZodError){
            return validationErrorResponse(res, error);
        }

        if(error instanceof ErrorWithCode){
            return res.status(error.status).json(error.toJSON());
        }
    
        return internalServerErrorResponse(res);
    }
}