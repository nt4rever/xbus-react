import { createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { axiosService } from "../apis/axiosService";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/slice";
import { getUser } from "../apis/auth/user";
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

  useEffect(() => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (access_token && verifyToken(access_token)) {
        axiosService.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        fetchUser();
      } else {
        localStorage.removeItem("access_token");
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
