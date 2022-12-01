import { createContext, useReducer } from "react";

const initialState = {
  routeKey: null,
  data: null,
  total: null,
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
    case "SET_TOTAL":
      return {
        ...state,
        total: action.payload.total,
      };
    case "INCREASE_CURRENT_LIST":
      if (state.total && state.total > state.currentList)
        return {
          ...state,
          currentList: state.currentList + 5,
        };
      else return state;
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

  const setTotal = (total) => {
    dispatch({
      type: "SET_TOTAL",
      payload: {
        total: total,
      },
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
        total: state.total,
        setTotal,
      }}
    >
      {children}
    </BusDetailContext.Provider>
  );
};
