import { createContext, useReducer } from "react";

const initialState = {
  isDetail: false,
  record: null,
  refetch: false,
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ROUTE_DETAIL":
      return {
        ...state,
        isDetail: true,
        record: action.payload.record,
      };
    case "CLOSE_ROUTE_DETAIL":
      return {
        ...state,
        isDetail: false,
        record: null,
      };
    case "REFETCH":
      return {
        ...state,
        refetch: !state.refetch,
      };

    default:
      return state;
  }
};
export const RouteAdminContext = createContext(initialState);

export const RouteAdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  const openRouteDetail = (record) => {
    dispatch({
      type: "OPEN_ROUTE_DETAIL",
      payload: {
        record,
      },
    });
  };

  const closeRouteDetail = () => {
    dispatch({
      type: "CLOSE_ROUTE_DETAIL",
    });
  };

  const refetchHandle = () => {
    dispatch({
      type: "REFETCH",
    });
  };

  return (
    <RouteAdminContext.Provider
      value={{
        isDetail: state.isDetail,
        record: state.record,
        refetch: state.refetch,
        openRouteDetail,
        closeRouteDetail,
        refetchHandle,
      }}
    >
      {children}
    </RouteAdminContext.Provider>
  );
};
