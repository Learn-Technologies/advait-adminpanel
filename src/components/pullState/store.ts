import { Store } from "pullstate";
import VUtils from "../common/VUtils";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  getAuthInstance,
  signOutFromFirebase,
} from "../services/firebase/FirebaseService";

interface IStore {
  user?: User | null;
  authUserId: string;
  authUserDoc: string;
  isSideDrawerOpen: boolean;
  contactLength: number;
}

let initialState: IStore = {
  authUserId: "",
  authUserDoc: "",
  isSideDrawerOpen: false,
  contactLength: 0,
};

export const authStore = new Store<IStore>(initialState);

export function setAuthUserId(id: string) {
  return authStore.update((s) => {
    s.authUserId = id;
  });
}

export function waitForAuthChange() {
  onAuthStateChanged(getAuthInstance(), async (user) => {
    return authStore.update((s) => {
      s.user = user;
    });
  });
}
export async function logoutFirebase() {
  await VUtils.rmvCookies("isUserAuth");
  await signOutFromFirebase();
}

export function setSideDrawer(sideDrawer: boolean) {
  return authStore.update((s) => {
    s.isSideDrawerOpen = sideDrawer;
  });
}

export function setContactList(len: number) {
  return authStore.update((s) => {
    s.contactLength = len;
  });
}
