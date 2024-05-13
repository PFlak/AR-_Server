// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// ------------- CONIFG -------------- //
// Zadanie 2 A
const firebaseConfig = {};
// --------------------------------- //

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const analytics = getAnalytics(app);
export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);
export const signInWithGooglePopup = () => signInWithPopup(FIREBASE_AUTH, provider);

export default app;