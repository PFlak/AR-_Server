import { RecordValue } from "../../models/databaseManager.models";

export class ValidationHelper {
    public static isTypeMatchingConfig(value: RecordValue, key: string, config: Record<string, string>): boolean{
        return typeof value === config[key];
    }

    public static areObjectsEmpty(...objects: Object[]): boolean{
        for(const key of objects){
            if(Object.keys(key).length > 0){
                return false
            }
        }

        return true;
    }

    public static areArraysEmpty(...arrays: any[]): boolean{
        for(const key in arrays){
            if(key.length > 0){
                return false;
            }
        }

        return true;
    }
}