import { NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { internalServerErrorResponse } from "../utils/responses/internalServerError.error";
import CompetitionManager from "../managers/competitionManager";
import { ErrorWithCode } from "../common/common.error.config";
import { CompetitionNotFoundError } from "../utils/errors/errors.error";
import { Socket } from "socket.io";
import { GeoPoint, Timestamp } from "firebase-admin/firestore";
import { PositionControlEvent } from "../models/competition.model";

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

export const setupCompetitionSocketConncetion = async (
  socket: Socket
) => {
  setupComeptitionListeners(socket);
};

export const setupComeptitionListeners = (socket: Socket) => {

  socket.on("positionControl", handlePositionControllListener);

  socket.on("disconnect",  () => {

    const competition_id = socket.handshake.query.competitionID as string;
    const team_id = socket.handshake.query.teamID as string;
    const stage_id = socket.handshake.query.stage_id as string;

    CompetitionManager.storePositionsToDatabase(competition_id, team_id, stage_id);
  });
};

export const handlePositionControllListener = (data: PositionControlEvent) => {
  
  const positions = data.geoPoint;
  const team_id = data.team_id;
  const competition_id = data.competition_id;
  
  CompetitionManager.storePosition(competition_id, team_id, positions);
}