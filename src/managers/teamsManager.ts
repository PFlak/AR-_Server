import { TeamRecord } from "../models/teams.models";
import DatabaseManager from "./databaseManager";

class TeamsManager {
    constructor(){};

    public async addNewTeam(teamRecord: TeamRecord): Promise<void> {
        await DatabaseManager.addRecord("COMPETITION_TEAMS_COLLECTIONS", teamRecord);
    }

    public async removeTeamById(teamID: string): Promise<void> {
        await DatabaseManager.deleteRecord("COMPETITION_TEAMS_COLLECTIONS", teamID);
    }
}

const teamsManager = new TeamsManager();

export default teamsManager;