import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../apis/auth";
import { authActions } from "../store/auth/slice";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * It's a function that takes an object with three properties (values, onSuccess, onError) and returns
   * a promise that resolves to an object with three properties (access_token, refresh_token, user).
   *
   * The function is called with an object that has three properties: values, onSuccess, and onError.
   *
   * The function calls authService.login(values) which returns a promise that resolves to an object with
   * three properties: access_token, refresh_token, user.
   *
   * The function then calls dispatch(authActions.login({ isLogged: true, user, accessToken:
   * access_token, refreshToken: refresh_token, })) which returns undefined.
   *
   * The function then calls onSuccess() which returns undefined.
   *
   * The function then returns undefined.
   *
   * The function is called with an object that has three properties: values, onSuccess,
   */
  const login = async ({ values, onSuccess, onError }) => {
    try {
      setIsLoading(true);
      const { access_token, refresh_token, user } = await authService.login(
        values
      );
      setIsLoading(false);
      dispatch(
        authActions.login({
          isLogged: true,
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      onError(err);
    }
  };

  /**
   * It takes in a token, and then it calls the googleAuth function in authService.js, which is a
   * function that makes a post request to the backend.
   *
   * The googleAuth function in authService.js is as follows:
   */
  const googleLogin = async ({ token, onSuccess, onError }) => {
    try {
      setIsLoading(true);
      const { user, access_token, refresh_token } =
        await authService.googleAuth(token);
      dispatch(
        authActions.login({
          isLogged: true,
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      onError(err);
    }
  };

  /**
   * It's a function that takes an object with three properties (values, onSuccess, onError) and
   * returns a promise that resolves to an object with three properties (user, access_token,
   * refresh_token).
   */
  const signup = async ({ values, onSuccess, onError }) => {
    try {
      setIsLoading(true);
      const { user, access_token, refresh_token } = await authService.signup(
        values
      );
      dispatch(
        authActions.login({
          isLogged: true,
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      onError(err);
    }
  };

  return { login, googleLogin, signup, isLoading };
};

export default useAuth;
