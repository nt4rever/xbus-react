import { createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { axiosService } from "../apis/axiosService";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/slice";
import { getUser } from "../apis/auth/user";
import { refreshLogin } from "../apis/auth/refresh";
export const JWTAuthContext = createContext({});

const verifyToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp > Date.now() / 1000;
};

export const JWTAuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      dispatch(
        authActions.login({
          isLogged: true,
          user: res,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHanlde = async (token) => {
    try {
      const data = await refreshLogin(token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      axiosService.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      await fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      if (access_token && verifyToken(access_token)) {
        axiosService.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        fetchUser();
      } else if (refresh_token && verifyToken(refresh_token)) {
        refreshHanlde(refresh_token);
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log("access_token_not_found_or_expired");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <JWTAuthContext.Provider value={{}}>{children}</JWTAuthContext.Provider>
  );
};
