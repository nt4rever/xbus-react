import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

export const getListBusRoute = async () => {
  const query = ref(db, "Routes");
  const res = await new Promise((resolve) => {
    onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push({ ...childData, key });
        });
        resolve(data);
      } else {
        resolve([]);
      }
    });
  });
  return res;
};
