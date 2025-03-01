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

export function useLectList() {
  return useQuery("lecturer", async () => {
    let ref = await getDocs(
      query(collection(getStore(), "lecturer"), orderBy("createdAt", "desc"))
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateLectList(postExecution?: (data?: any) => void) {
  return useMutation("lecturer", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "lecturer", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "lecturer"), other);
    }
    return ref;
  });
}

export function useDeleteLectList(postExecution?: (data?: any) => void) {
  return useMutation("lecturer", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "lecturer", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
