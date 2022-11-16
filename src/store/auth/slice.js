import { createSlice } from "@reduxjs/toolkit";

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
      return state;
    },
    logout: (state) => {
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
