import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { getStore } from "../FirebaseService";
import VUtils from "@/src/components/common/VUtils";

export function useContactList() {
  return useQuery("contact", async () => {
    let ref = await getDocs(
      query(collection(getStore(), "contact"), orderBy("createdAt", "desc"))
    );
    return VUtils.transformFirebaseResult(ref);
  });
}
