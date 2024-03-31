export type Collection = FirebaseFirestore.CollectionReference;

export type RecordValue = string | number | boolean | null | Record<string, any>;

//! There is something wrong...
export type CollectionsList = {
    USERS_COLLECTIONS: Collection;
    UN_AUTHORIZATED_USERS_COLLECTIONS: Collection;
    COMPETITION_TEAMS_COLLECTIONS: Collection;
    COMPETITIONS_COLLECTIONS: Collection;
    YACHT_CATEGORIES_COLLECTIONS: Collection;
}

//! There is something wrong...
export const COLLECTION_NAMES: Record<keyof CollectionsList, string> = {
    USERS_COLLECTIONS: "UsersCollections",
    UN_AUTHORIZATED_USERS_COLLECTIONS: "UnAuthoriztedUsers",
    COMPETITION_TEAMS_COLLECTIONS: "CompetitionTeams",
    COMPETITIONS_COLLECTIONS: "Competitions",
    YACHT_CATEGORIES_COLLECTIONS: "YachtCategories",
}