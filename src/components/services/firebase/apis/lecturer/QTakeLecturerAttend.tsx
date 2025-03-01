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

export function useLectAttendList() {
  return useQuery("lecturerAttend", async () => {
    let ref = await getDocs(
      query(
        collection(getStore(), "lecturerAttend"),
        orderBy("createdAt", "desc")
      )
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateLectAttend(postExecution?: (data?: any) => void) {
  return useMutation("lecturerAttend", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "lecturerAttend", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "lecturerAttend"), other);
    }
    return ref;
  });
}

export function useDeleteSLectAttend(postExecution?: (data?: any) => void) {
  return useMutation("lecturerAttend", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "lecturerAttend", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
