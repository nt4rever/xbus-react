import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore } from "redux-persist";
import createRootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const __prod__ = process.env.NODE_ENV === "production";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: !__prod__,
  middleware: [],
});

export const persistor = persistStore(store);
export default store;
