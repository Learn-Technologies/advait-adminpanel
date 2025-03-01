import { Store } from "pullstate";
import VUtils from "../common/VUtils";

interface IStore {
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
