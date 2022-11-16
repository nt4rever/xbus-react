import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

export const getUser = async (key) => {
  const query = ref(db, `Users/${key}`);
  const res = await new Promise((resolve) => {
    onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
  return res;
};
