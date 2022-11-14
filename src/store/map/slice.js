import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    direction: "forward",
    currentStation: undefined,
    stations: [15.987076944483714, 108.24177253534327],
  },
  reducers: {
    setStations: (state, action) => {
      state.stations = action.payload?.stations;
      state.currentStation = action.payload?.currentStation
        ? action.payload?.currentStation
        : state.currentStation;
      state.direction = action.payload?.direction
        ? action.payload?.direction
        : state.direction;
      return state;
    },
    setDirection: (state, action) => {
      state.direction = action.payload?.direction;
      return state;
    },
    setCurrentStation: (state, action) => {
      state.currentStation = action.payload?.currentStation;
      return state;
    },
  },
});

// actions
export const mapActions = mapSlice.actions;

// reducer
const mapReducer = mapSlice.reducer;
export default mapReducer;
