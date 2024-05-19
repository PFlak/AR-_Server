import { Socket } from "socket.io";
import { InvalidTokenError } from "../utils/errors/errors.error";
import { ErrorWithCode } from "../common/common.error.config";
import { NextSocketFunction } from "../models/common.models";
import { FirebaseHelper } from "../utils/helpers/firebaseHelper";
import { DecodedToken } from "../models/user.model";
import CompetitionManager from "../managers/competitionManager";
import { compeittionStageParser, competitionIdParser, teamIdParser } from "../utils/schemas/competition.schema";
import DatabaseManager from "./../managers/databaseManager";
import { EventsManager } from "../managers/eventsManager";

export const authSocketMiddleware = async (
    socket: Socket,
    next: NextSocketFunction
) => {
    try {

        const token = socket.handshake.auth.token.split(" ")[1] as string;
        
        if (!token) {
            throw new InvalidTokenError()
        }

        const decodedToken = await FirebaseHelper.verifyToken(token) as DecodedToken;

        socket.data = decodedToken;

        next();
    } catch (error: Error | unknown) {
        console.log(error)
        if (error instanceof ErrorWithCode) {
            console.log(error.message)
            next(error);
        }
        next(new Error());
    }
}

export const parseSocketConnectionMiddleware = async (
  socket: Socket,
  next: NextSocketFunction
) => {
  try {
    
    const competitionID = await competitionIdParser.parseAsync(socket.handshake.query.competitionID);
    const stage_id = await compeittionStageParser.parseAsync(socket.handshake.query.stageID);

    if(await CompetitionManager.isStageValid(competitionID, stage_id) === false){
      throw new Error();
    }

    const teamID = DatabaseManager.getNewDocuemntID();

    socket.handshake.query.teamID = teamID;
    
    EventsManager.sendMessage(socket, "InitialMessage", { teamID });

    CompetitionManager.addTeamToCompetition(competitionID, teamID);

    next();
  } catch(error){
    if(error instanceof ErrorWithCode){
      next(error);
    }
    next(new Error());

    socket.disconnect();
  }
}