import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    direction: "forward",
    currentStation: undefined,
    stations: [15.987076944483714, 108.24177253534327],
    isRoute: false,
  },
  reducers: {
    setStations: (state, action) => {
      const { stations, currentStation, direction, isRoute } = action.payload;
      state.stations = stations ? stations : state.stations;
      state.currentStation = currentStation
        ? currentStation
        : state.currentStation;
      state.direction = direction ? direction : state.direction;
      state.isRoute = isRoute !== undefined ? isRoute : state.isRoute;
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
    setRoute: (state, action) => {
      state.isRoute = action.payload?.isRoute;
      return state;
    },
  },
});

// actions
export const mapActions = mapSlice.actions;

// reducer
const mapReducer = mapSlice.reducer;
export default mapReducer;
