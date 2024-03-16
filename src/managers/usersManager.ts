import { UserNotFoundError } from "../utils/errors/errors.error";
import DatabaseManager from "./databaseManager";
import { CollectionNames } from "../utils/firebase/collectionNames";
import { USER_FIELDS } from "../utils/firebase/userFields";
import { User } from "../models/user.model";
import { Logger } from "../models/common.models";
import LoggerHelper from "../utils/logger";


class UsersManager {

    private logger!: Logger;

    constructor(){
        this.init();
    }

    private init(): void{
        this.initLogger();
    }

    private initLogger(): void{
        this.logger = LoggerHelper.getLogger("UsersManager");
    }

    public async getUser(user_id: string): Promise<User | null> {
        try {
            const userData = await DatabaseManager.getRecordById<User>(
                CollectionNames.COLLECTION_NAMES.USERS_COLLECTIONS,
                USER_FIELDS.user_id,
                user_id
            );

            if (userData === null) {
                throw new UserNotFoundError();
            }

            return userData;
        } catch (error) {
            this.logger.error(error);

            return null;
        }
    }

    public async updateUser(user_id: string, newData: Partial<User>): Promise<boolean> {
        try {
            const userData = await this.getUser(user_id);

            if (userData) {
                const updatedUserData = { ...userData, ...newData };

                await DatabaseManager.addRecord(
                    CollectionNames.COLLECTION_NAMES.USERS_COLLECTIONS,
                    updatedUserData
                );

                return true;
            } else {
                throw new UserNotFoundError();
            }
        } catch (error) {
            this.logger.error(error);

            return false;
        }
    }

    public async deleteUser(user_id: string): Promise<boolean> {
        try {   
            const userData = await this.getUser(user_id);

            if (userData) {
                await DatabaseManager.deleteRecord(
                    CollectionNames.COLLECTION_NAMES.USERS_COLLECTIONS,
                    USER_FIELDS.user_id,
                    user_id
                );

                return true;
            } else {
                throw new UserNotFoundError();
            }
        } catch (error) {
            this.logger.error(error);

            return false;
        }
    }
}

const instance = new UsersManager();

export default instance;