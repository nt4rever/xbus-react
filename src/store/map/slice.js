import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {},
  reducers: {},
});

// actions
export const mapActions = mapSlice.actions;

// reducer
const mapReducer = mapSlice.reducer;
export default mapReducer;
