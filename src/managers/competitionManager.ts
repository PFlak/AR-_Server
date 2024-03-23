import { CompetitionNotFoundError } from "../utils/errors/errors.error";
import DatabaseManager from "./databaseManager";
import { COLLECTION_NAMES } from "../models/databaseManager.models";
import { Competition } from "../models/competition.model";
import { Logger } from "../models/common.models";
import LoggerHelper from "../utils/logger";

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

    return competitionData;
  }
}

const instance = new CompetitionManager();

export default instance;
