
export type Collection = FirebaseFirestore.CollectionReference;

export type RecordValue = string | number | boolean | null | Record<string, any>;

export type CollectionsList = {
    USERS_COLLECTIONS: Collection;
}

export const COLLECTION_NAMES: Record<string, keyof CollectionsList> = {
    USERS_COLLECTIONS: "USERS_COLLECTIONS"
};