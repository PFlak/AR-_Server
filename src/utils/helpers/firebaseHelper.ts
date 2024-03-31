import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import firebase from "firebase-admin";
import { InvalidTokenError } from "../errors/errors.error";

export class FirebaseHelper {
    public static converterAssignTypes<T extends {}>() {
        return {
            toFirestore(doc: T): FirebaseFirestore.DocumentData {
                return doc;
            },
            fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T {
                return snapshot.data()! as T;
            }
        };
    };

    public static async getServerTimeStamp(): Promise<firebase.firestore.Timestamp>{
        return await firebase.firestore.Timestamp.now();
    }

    public static async verifyToken(token: string): Promise<DecodedIdToken> {
        try {
            const decodedValue = await firebase.app().auth().verifyIdToken(token);

            return decodedValue;
        } catch (error) {
            console.log(error)
            throw new InvalidTokenError();
        }
    }
}
