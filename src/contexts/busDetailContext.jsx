import { createContext, useState } from "react";

export const BusDetailContext = createContext({});

export const BusDetailProvider = ({ children }) => {
  const [routeKey, setRouteKey] = useState(null);
  const [data, setData] = useState(null);
  return (
    <BusDetailContext.Provider value={{ routeKey, setRouteKey, data, setData }}>
      {children}
    </BusDetailContext.Provider>
  );
};
