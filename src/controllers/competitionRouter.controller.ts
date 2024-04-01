import { NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import CompetitionManager from "../managers/competitionManager";
import YachtManager from "../managers/yachtManager";
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
                result: competitionData,
            });
        } 
    } catch (error) {   
        if(error instanceof ErrorWithCode){
            return res.status(error.status).json(error.toJSON());
        }
    
        return internalServerErrorResponse(res);
    };
};

export const addYachtToCompetitionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const competition_id = req.params.id;
    const yacht_data = req.body;

    await CompetitionManager.getCompetition(competition_id);

    await YachtManager.addNewYachtToCompetition(competition_id, yacht_data);

    res.status(200).json({
      status: CommonRoutesConfig.statusMessage.SUCCESS,
      message: "Success in adding new yacht to competition",
      result: {},
    });
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      return res.status(error.status).json(error.toJSON());
    }

    return internalServerErrorResponse(res);
  }
};