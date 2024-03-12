
export type Collection = FirebaseFirestore.CollectionReference;

export type RecordValue = string | number | boolean | null | Record<string, any>;

export type CollectionsList = {
    USERS_COLLECTIONS: Collection;
}