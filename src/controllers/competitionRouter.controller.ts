import { NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import CompetitionManager from "../managers/competitionManager";
import { ErrorWithCode } from "../common/common.error.config";
import { CompetitionNotFoundError } from "../utils/errors/errors.error";

export const getSpecificCompetitionHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const competition_id = req.params.id;

        const competitionData = await CompetitionManager.getCompetition(competition_id);

        if (competitionData) {
            res.status(200).json({
                status: CommonRoutesConfig.statusMessage.SUCCESS,
                message: `Competition with ID ${competition_id} fetched successfully`,
                data: competitionData,
            });
        } 
    } catch (error) {   
        if(error instanceof ErrorWithCode){
            return res.status(error.status).json(error.toJSON());
        }
    
        return internalServerErrorResponse(res);
    };
};
