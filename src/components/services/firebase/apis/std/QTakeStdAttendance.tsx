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

export function useStudAttendList() {
  return useQuery("studentAttend", async () => {
    let ref = await getDocs(
      query(
        collection(getStore(), "studentAttend"),
        orderBy("createdAt", "desc")
      )
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateStudAttend(postExecution?: (data?: any) => void) {
  return useMutation("studentAttend", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "studentAttend", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "studentAttend"), other);
    }
    return ref;
  });
}

export function useDeleteStudAttend(postExecution?: (data?: any) => void) {
  return useMutation("studentAttend", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "studentAttend", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
