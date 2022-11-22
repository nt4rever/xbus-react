import { createContext, useReducer } from "react";

const initialState = {
  routeKey: null,
  data: null,
  currentList: 5,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROUTE_KEY":
      return {
        ...state,
        routeKey: action.payload.routeKey,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload.data,
      };
    case "INCREASE_CURRENT_LIST":
      return {
        ...state,
        currentList: state.currentList + 5,
      };
    default: {
      return state;
    }
  }
};

export const BusDetailContext = createContext(initialState);

export const BusDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const setRouteKey = (key) => {
    dispatch({
      type: "SET_ROUTE_KEY",
      payload: {
        routeKey: key,
      },
    });
  };

  const setData = (data) => {
    dispatch({
      type: "SET_DATA",
      payload: { data: data },
    });
  };

  const setCurrentList = () => {
    dispatch({
      type: "INCREASE_CURRENT_LIST",
    });
  };

  return (
    <BusDetailContext.Provider
      value={{
        routeKey: state.routeKey,
        setRouteKey,
        data: state.data,
        setData,
        currentList: state.currentList,
        setCurrentList,
      }}
    >
      {children}
    </BusDetailContext.Provider>
  );
};
