import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import mapReducer from "./map/slice";
import modalReducer from "./modal/slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
    modal: modalReducer,
  },
});
