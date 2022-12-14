import { notification } from "antd";
import { createContext, useReducer } from "react";

const initialState = {
  isNew: false,
  isDetail: false,
  record: null,
  refetch: false,
  isStation: false,
  isRating: false,
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
    case "NEW":
      return {
        ...state,
        isNew: !state.isNew,
      };
    case "OPEN_STATION":
      return {
        ...state,
        isStation: true,
        record: action.payload.record,
      };
    case "CLOSE_STATION":
      return {
        ...state,
        isStation: false,
        record: null,
      };
    case "OPEN_RATING":
      return {
        ...state,
        isRating: true,
        record: action.payload.record,
      };
    case "CLOSE_RATING":
      return {
        ...state,
        isRating: false,
        record: null,
      };
    default:
      return state;
  }
};
export const RouteAdminContext = createContext(initialState);

export const RouteAdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "top",
    });
  };

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

  const newHandle = () => {
    dispatch({
      type: "NEW",
    });
  };

  const openStation = (record) => {
    dispatch({
      type: "OPEN_STATION",
      payload: {
        record,
      },
    });
  };

  const closeStation = () => {
    dispatch({
      type: "CLOSE_STATION",
    });
  };

  const openRating = (record) => {
    dispatch({
      type: "OPEN_RATING",
      payload: {
        record,
      },
    });
  };

  const closeRating = () => {
    dispatch({
      type: "CLOSE_RATING",
    });
  };

  return (
    <RouteAdminContext.Provider
      value={{
        isDetail: state.isDetail,
        record: state.record,
        refetch: state.refetch,
        isNew: state.isNew,
        isStation: state.isStation,
        isRating: state.isRating,
        openRouteDetail,
        closeRouteDetail,
        refetchHandle,
        newHandle,
        openStation,
        closeStation,
        openRating,
        closeRating,
        openNotification,
      }}
    >
      <>
        {contextHolder}
        {children}
      </>
    </RouteAdminContext.Provider>
  );
};
