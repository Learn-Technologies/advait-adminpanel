import { getApp, initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { firebaseConfiguration } from "../config/firebaseConfig";

const firebaseConfig = firebaseConfiguration;
let app: any = null;
export function initFirebase() {
  if (!app) app = initializeApp(firebaseConfig);
}

export function getAuthInstance() {
  const app = getApp();
  return getAuth(app);
}

export function getStore() {
  initFirebase();
  const app = getApp();

  return initializeFirestore(app, { ignoreUndefinedProperties: true });
}
export function signOutFromFirebase() {
  const auth = getAuth();
  return signOut(auth);
}
