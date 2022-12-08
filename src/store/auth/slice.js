import { createSlice } from "@reduxjs/toolkit";
import {
  KEY_LOCAL_STORAGE,
  removeLocalStorage,
  saveLocalStorage,
} from "../../utils/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = action.payload?.isLogged;
      state.user = action.payload?.user;
      saveLocalStorage(
        KEY_LOCAL_STORAGE.ACCESS_TOKEN,
        action.payload?.accessToken
      );
      saveLocalStorage(
        KEY_LOCAL_STORAGE.REFRESH_TOKEN,
        action.payload?.refreshToken
      );
      return state;
    },
    logout: (state) => {
      removeLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
      removeLocalStorage(KEY_LOCAL_STORAGE.REFRESH_TOKEN);
      state.isLogged = false;
      state.user = undefined;
    },
  },
});

// actions
export const authActions = authSlice.actions;

// reducer
const authReducer = authSlice.reducer;
export default authReducer;
