import { CompetitionNotAcitve, CompetitionNotFoundError } from "../utils/errors/errors.error";
import DatabaseManager from "./databaseManager";
import { DatabaseHelper } from "../utils/helpers/databaseHelper";
import { COLLECTION_NAMES } from "../models/databaseManager.models";
import { Competition, CompetitionPositions } from "../models/competition.model";
import { Logger, Position } from "../models/common.models";
import LoggerHelper from "../utils/logger";
import { GeoPoint, Timestamp } from "firebase-admin/firestore";

class CompetitionManager {
  private logger!: Logger;
  private competitionPositions: CompetitionPositions = {};

  constructor() {
    this.init();
  }

  private init(): void {
    this.initLogger();
  }

  private initLogger(): void {
    this.logger = LoggerHelper.getLogger("CompetitionManager");
  }

  public async getCompetition(competition_id: string): Promise<Competition> {
    const competitionData = await DatabaseManager.getRecordById<Competition>(
      "COMPETITIONS_COLLECTIONS",
      "competition_id",
      competition_id
    );

    if (competitionData === null) {
      throw new CompetitionNotFoundError();
    }

    const [yachtCategories, competitionTeams, competitionStages] =
      await Promise.all([
        DatabaseHelper.fetchDocuments(competitionData.yacht_categories),
        DatabaseHelper.fetchDocuments(competitionData.competition_teams),
        DatabaseHelper.fetchDocuments(competitionData.competition_stages),
      ]);

    const competitionUpdatedData: Competition = {
      ...competitionData,
      yacht_categories: yachtCategories,
      competition_teams: competitionTeams,
      competition_stages: competitionStages,
    };

    return competitionUpdatedData;
  }

  public async isCompetitionActive(competition_id: string): Promise<boolean> {
    const document = await DatabaseManager.getRecordById<Competition>(
      "COMPETITIONS_COLLECTIONS", 
      "competition_id", 
      competition_id
    );

    if(document === null)
      throw new CompetitionNotFoundError();

    const startTime = document.start_time.seconds;
    const endTime = document.end_time.seconds;
    const currDate = Timestamp.now().seconds;
    
    if(currDate < startTime || currDate > endTime)
      return false;

    return true
  }

  public async startCompetition(competition_id: string): Promise<void>{
    
    this.competitionPositions[competition_id] = {};
  }

  public async addTeamToCompetition(competition_id: string, team_id: string): Promise<void> {
    
    if(typeof this.competitionPositions[competition_id] === "undefined"){
      throw new CompetitionNotAcitve();
    }

    await DatabaseManager.addToCompetitionTeams(competition_id, team_id, { users: ["User1"] });
    
    this.competitionPositions[competition_id][team_id] = [];
  }

  public isTeamInCompetition(competition_id: string, team_id: string): boolean {
    if(typeof this.competitionPositions[competition_id] === "undefined"){
      throw new CompetitionNotAcitve();
    }

    return (typeof this.competitionPositions[competition_id][team_id] === "undefined");
  }

  public async storePosition(competition_id: string, team_id: string, position: Position) {
    if(await this.isCompetitionActive(competition_id) === false)
      return;

    if(this.isTeamInCompetition(competition_id, team_id) === false)
      return;
    
    this.competitionPositions[competition_id][team_id].push(position);
  }

  public async storePositionsToDatabase(competition_id: string, team_id: string, stage_id: string): Promise<void> {
    const positions = this.competitionPositions[competition_id][team_id];
    
    if(positions.length === 0)
      return;

    const validFormatPositions = positions.map((item) => {
      return new GeoPoint(item.latitude, item.longtitude);
    })
    
    DatabaseManager.storeCompetitionStage(validFormatPositions, competition_id, stage_id, team_id);
  }

  public async isStageValid(competition_id: string, stage_id: string): Promise<boolean>{
    return await DatabaseManager.isStageExist(competition_id, stage_id);
  }
}

const instance = new CompetitionManager();

export default instance;
