import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import mapReducer from "./map/slice";
import modalReducer from "./modal/slice";

const createRootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  modal: modalReducer,
});

export default createRootReducer;
