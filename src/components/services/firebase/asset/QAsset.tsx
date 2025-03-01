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
import { getStore } from "../FirebaseService";

export function useAssetsList() {
  return useQuery("newAsset", async () => {
    let ref = await getDocs(
      query(collection(getStore(), "newAsset"), orderBy("createdAt", "desc"))
    );
    return VUtils.transformFirebaseResult(ref);
  });
}

export function useAddUpdateAssetList(postExecution?: (data?: any) => void) {
  return useMutation("newAsset", async (data: any) => {
    let ref;
    const { id, ...other } = data;
    if (id) {
      ref = await setDoc(doc(getStore(), "newAsset", id), other);
    } else {
      ref = await addDoc(collection(getStore(), "newAsset"), other);
    }
    return ref;
  });
}

export function useDeleteAssetList(postExecution?: (data?: any) => void) {
  return useMutation("newAsset", async (data: any) => {
    let ref = await deleteDoc(doc(getStore(), "newAsset", data.id));
    if (postExecution) {
      postExecution(ref);
    }
    return ref;
  });
}
