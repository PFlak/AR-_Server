var admin = require("firebase-admin");

var serviceAccount = require("../utils/configs/automatyzacjaregat-firebase-adminsdk-e5evl-3c305646f0.json");

export function initalizeFirebase(): void {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
