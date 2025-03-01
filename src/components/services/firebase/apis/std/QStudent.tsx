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

export function useStudList() {
  return useQuery("student", async () => {
    let ref = await getDocs(
      query(collection(getStore(), "student"), orderBy("createdAt", "desc"))
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateStudList(postExecution?: (data?: any) => void) {
  return useMutation("student", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "student", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "student"), other);
    }
    return ref;
  });
}

export function useDeleteStudList(postExecution?: (data?: any) => void) {
  return useMutation("student", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "student", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
