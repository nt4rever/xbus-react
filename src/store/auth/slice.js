import { createSlice } from "@reduxjs/toolkit";
import { axiosService } from "../../apis/axiosService";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    user: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = action.payload?.isLogged;
      state.user = action.payload?.user;
      const access_token = action.payload?.access_token;
      localStorage.setItem("access_token", access_token);
      axiosService.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      return state;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      delete axiosService.defaults.headers.common.Authorization;
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
