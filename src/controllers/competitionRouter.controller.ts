import { NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import CompetitionManager from "../managers/competitionManager";

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
        } else {
            res.status(404).json({
                status: CommonRoutesConfig.statusMessage.FAILED,
                message: `Competition with ID ${competition_id} not found`,
            });
        };  
    } catch (error) {
        res.status(500).json({
            status: CommonRoutesConfig.statusMessage.FAILED,
            message: `An error occurred while fetching the competition data`,
        });
    };
};
