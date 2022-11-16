import { onValue, ref, set } from "firebase/database";
import { makeKey } from "../utils/string";
import { db } from "./firebase";

export const getListRating = async (key) => {
  const query = ref(db, `Ratings/${key}`);
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

export const createRating = async (routeKey, rating) => {
  await set(ref(db, `Ratings/${routeKey}/${makeKey(12)}`), {
    name: rating.name,
    rating: rating.rating,
    text: rating.text,
    time: rating.time,
  });
  return true;
};
