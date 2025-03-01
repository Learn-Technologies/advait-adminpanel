import VUtils from "@/src/components/common/VUtils";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { getStore } from "../../FirebaseService";

export function useClassList() {
  return useQuery("class", async () => {
    let ref = await getDocs(
      query(collection(getStore(), "class"), orderBy("createdAt", "desc"))
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateClassList(postExecution?: (data?: any) => void) {
  return useMutation("class", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "class", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "class"), other);
    }
    return ref;
  });
}

export function useDeleteClassList(postExecution?: (data?: any) => void) {
  return useMutation("class", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "class", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
