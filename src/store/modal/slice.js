import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalRating: false,
    modalLogin: false,
  },
  reducers: {
    setModalRating: (state, action) => {
      state.modalRating = action.payload?.modalRating;
      return state;
    },
    setModalLogin: (state, action) => {
      state.modalLogin = action.payload?.modalLogin;
      return state;
    },
  },
});

// actions
export const modalActions = modalSlice.actions;

// reducer
const modalReducer = modalSlice.reducer;
export default modalReducer;
