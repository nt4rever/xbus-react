import { createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { axiosService } from "../apis/axiosService";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/slice";
import { apiAuthEndPoint } from "../apis/constant";
export const JWTAuthContext = createContext({});

const verifyToken = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.exp > Date.now() / 1000;
};

export const JWTAuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getUser = async () => {
    const res = await axiosService.post(apiAuthEndPoint.refresh);
    if (res.status === 200) {
      const { access_token, user } = res.data;
      window.localStorage.setItem("access_token", access_token);
      dispatch(
        authActions.login({
          isLogged: true,
          user,
        })
      );
    }
  };
  useEffect(() => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (verifyToken(access_token)) {
        axiosService.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        getUser();
      }
    } catch (err) {
      dispatch(authActions.logout());
    }
  }, []);
  return (
    <JWTAuthContext.Provider value={{}}>{children}</JWTAuthContext.Provider>
  );
};
