import { CollectionsList } from "../../models/databaseManager.models";

export class CollectionNames {
    public static COLLECTION_NAMES: Record<string, keyof CollectionsList> = {
        USERS_COLLECTIONS: "USERS_COLLECTIONS"
    }
}