import { GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [provider, setProvider] = useState<null | GoogleAuthProvider>(null);

  //TODO Zadanie 2B - Logowanie przy pomocy 'signInWithEmailAndPassword'
  const loginMethod = () => {};
  
  
  //TODO Zadanie 2 D - Rejestracja za pomoca Googla 'signInWithGooglePopup';
  const registerWithGoogle = async () => {}
  

  // TODO Zadanie 2 C - Rejestracja za pomoca emaila i hasla 'createUserWithEmailAndPassword'
  const registerWithEmailPassword = async () => {}

  const configureProvider = () => {}

  return {
    email,
    password,
    setEmail,
    setPassword,
    loginMethod,
    registerWithGoogle,
    registerWithEmailPassword
  }
};