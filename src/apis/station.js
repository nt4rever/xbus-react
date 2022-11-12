import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

export const getListStation = async (key) => {
  const query = ref(db, `Stations/${key}`);
  const res = await new Promise((resolve) => {
    onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        resolve(data);
      } else {
        resolve([]);
      }
    });
  });
  return res;
};
