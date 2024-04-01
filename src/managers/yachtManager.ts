import { error } from "console";
import { YachtCategorie } from "../models/yachtCategorie.models";
import DatabaseManager from "./databaseManager";

class YachtManager {
  constructor() {}

  public async addNewYacht(yachtRecord: YachtCategorie): Promise<void> {
    await DatabaseManager.addRecord(
      "YACHT_CATEGORIES_COLLECTIONS",
      yachtRecord
    );
  }

  public async addNewYachtToCompetition(
    competition_id: string,
    yachtRecord: YachtCategorie
  ): Promise<void> {
    await DatabaseManager.addRecordToSubcollection(
      "COMPETITIONS_COLLECTIONS",
      competition_id,
      "YachtCategories",
      yachtRecord
    );
  }
}

const instance = new YachtManager();

export default instance;
