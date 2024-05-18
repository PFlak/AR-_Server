import { CompetitionNotFoundError } from "../utils/errors/errors.error";
import DatabaseManager from "./databaseManager";
import { DatabaseHelper } from "../utils/helpers/databaseHelper";
import { COLLECTION_NAMES } from "../models/databaseManager.models";
import { Competition } from "../models/competition.model";
import { Logger } from "../models/common.models";
import LoggerHelper from "../utils/logger";
import { Timestamp } from "firebase-admin/firestore";

class CompetitionManager {
  private logger!: Logger;

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
      return false

    const startTime = document.start_time.seconds;
    const endTime = document.end_time.seconds;
    const currDate = Timestamp.now().seconds;
    
    if(currDate < startTime || currDate > endTime)
      return false;

    return true
  }
}

const instance = new CompetitionManager();

export default instance;
