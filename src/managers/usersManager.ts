import { UserNotFoundError } from "../utils/errors/errors.error";
import DatabaseManager from "./databaseManager";
import { User, UserRecord } from "../models/user.model";
import { Logger } from "../models/common.models";
import LoggerHelper from "../utils/logger";
import { ValidationHelper } from "../utils/helpers/validationHelper";
import { AddtionalInformationsValidationResult } from "../models/userManager.models";
import databaseManager from "./databaseManager";
import { UserManagerConfig } from "../utils/configs/userManagerConfig";

class UsersManager {

    private config: typeof UserManagerConfig = UserManagerConfig;
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
                "USERS_COLLECTIONS",
                "user_id",
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
                    'USERS_COLLECTIONS',
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
                    'USERS_COLLECTIONS',
                    "user_id",
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

    public validateUserRequestWithAdditionalInformations(data: any, checkedValues: any): AddtionalInformationsValidationResult {

        let wrongDataTypes = [];
        let validatedObjects = [];
        let missingInRequest = [];

        for (const key of checkedValues) {
            if (typeof data[key] !== "undefined") {

                if (ValidationHelper.isTypeMatchingConfig(data[key], key, this.config.typesof)) {

                    validatedObjects[key] = data[key];
                } else {

                    wrongDataTypes.push(key);
                }
            } else {

                missingInRequest.push(key);
            }
        }

        return { wrongDataTypes, validatedObjects, missingInRequest }
    }

    public async getMissingFiledsInUnAuthorizatedUser(userID: string): Promise<string[]>{

        const unAuthUserData = await databaseManager.getRecordById<UserRecord>("UN_AUTHORIZATED_USERS_COLLECTIONS", "uid", userID);
        
        const additionFieldsInDatabase = this.config.additionFieldsInDatabase as (keyof UserRecord)[];

        let missingProperties = [];

        if(unAuthUserData === null){
            throw new UserNotFoundError();
        }

        for(const key of additionFieldsInDatabase){
            
            if( typeof unAuthUserData[key] === "undefined" || unAuthUserData[key] === null || unAuthUserData[key] === ""){
                missingProperties.push(key);
            }
        }

        return missingProperties;
    }
}

const instance = new UsersManager();

export default instance;