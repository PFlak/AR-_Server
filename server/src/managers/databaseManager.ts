import { GeoPoint, getFirestore } from "firebase-admin/firestore";
import { FirebaseHelper } from "../utils/helpers/firebaseHelper";
import { initalizeFirebase } from "../firebase";
import { DatabaseManagerConfig } from "../utils/configs/databaseManagerConfig";
import { Collection, CollectionsList, RecordValue } from "../models/databaseManager.models";
import { Logger } from "../models/common.models";
import loggerHelper from "../utils/logger";
import { COLLECTION_NAMES } from "../models/databaseManager.models";

class DatabaseManager {
    private config!: typeof DatabaseManagerConfig;
    private db!: FirebaseFirestore.Firestore;
    private collections!: CollectionsList;
    private logger!: Logger;

    constructor() {
        this.init();
    }

    init(): void {

        initalizeFirebase();

        this.setupConfig();
        this.initLogger();
        this.initDatabase();
        this.initCollections();
    }

    private setupConfig(): void {
        this.config = DatabaseManagerConfig;
    }

    private initLogger(): void {
        this.logger = loggerHelper.getLogger("DatabaseManager");
    }

    private initDatabase(): void {

        this.db = getFirestore();
        this.db.settings(this.config.databaseSettings);
    }

    private initCollections(): void {

        this.collections = {
            USERS_COLLECTIONS: this.db.collection(COLLECTION_NAMES.USERS_COLLECTIONS),
            COMPETITIONS_COLLECTIONS: this.db.collection(COLLECTION_NAMES.COMPETITIONS_COLLECTIONS),
            UN_AUTHORIZATED_USERS_COLLECTIONS: this.db.collection(COLLECTION_NAMES.UN_AUTHORIZATED_USERS_COLLECTIONS),
            COMPETITION_TEAMS_COLLECTIONS: this.db.collection(COLLECTION_NAMES.COMPETITIONS_COLLECTIONS),
            YACHT_CATEGORIES_COLLECTIONS: this.db.collection(COLLECTION_NAMES.YACHT_CATEGORIES_COLLECTIONS),
        };
    }

    private async getCollection(collectionName: keyof CollectionsList): Promise<Collection> {
        return this.collections[collectionName];
    }

    public async getRecordsById<T extends object>(
        collectionName: keyof CollectionsList,
        recordID: string,
        recordValue: RecordValue
    ): Promise<Array<T> | []> {
        try {
            const collection = await this.getCollection(collectionName)

            const data = await collection
                .where(recordID, "==", recordValue)
                .withConverter(FirebaseHelper.converterAssignTypes<T>())
                .get();

            const parsedData = data.docs.map((item) =>
                Object.assign({ id: item.id }, item.data())
            );

            return parsedData;
        } catch (error) {
            this.logger.error(error);
            return [];
        }
    };

    public async addRecord(
        collectionName: keyof CollectionsList,
        data: Record<string, any>
    ): Promise<void> {
        try {
            const collection = await this.getCollection(collectionName);

            await collection.add(data);
        } catch (error) {
            this.logger.error(error);
        }
    };

    public async getRecordById<T extends object>(
        collectionName: keyof CollectionsList,
        recordID: string,
        recordValue: RecordValue
    ): Promise<T | null> {
        try {
            const collection = await this.getCollection(collectionName);

            const record = await collection
                .where(recordID, "==", recordValue)
                .limit(1)
                .withConverter(FirebaseHelper.converterAssignTypes<T>())
                .get();

            return record.docs[0] !== undefined ? record.docs[0].data() : null;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    public async deleteRecord(
        collectionName: keyof CollectionsList,
        docId: string
    ): Promise<void> {
        try {
            const collection = await this.getCollection(collectionName);

            await collection.doc(docId).delete();
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async addRecordWithDocumentId(        
        collectionName: keyof CollectionsList,
        data: Record<string, any>,
        docId: string
    ): Promise<void>{
        try{
            const collection = await this.getCollection(collectionName);

            await collection.doc(docId).set(data);
        } catch(error){
            this.logger.error(error);
        }
    }

    public async storeCompetitionStage(
      positions: Record<string, any>,
      competitionID: string,
      teamID: string
    ){
      const collection = await this.getCollection("COMPETITIONS_COLLECTIONS");
      
      const subCollections = await collection.doc(competitionID).listCollections();

      let competitionStages = null;

      for(let i=0; i<subCollections.length; i++){
        if(subCollections[i].id === "CompetitionStages"){
          competitionStages = subCollections[i];
        }
      }

      if(competitionStages === null) return;

      console.log((await competitionStages.get()).docs[0].data())

      await competitionStages.add({
        geoPoints: positions,
        team_id: teamID
      })
    };
}

const instance = new DatabaseManager();

export default instance;