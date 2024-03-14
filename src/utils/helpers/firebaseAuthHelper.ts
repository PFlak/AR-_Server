import admin from "../firebase/index";

async function verifyToken(token: string) {
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    return decodedValue;
  } catch (error) {
    throw error;
  }
}

export default verifyToken;
