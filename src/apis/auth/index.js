import axiosService from "../axiosService";
import { apiAuthEndPoint } from "../constant";

const login = async (data) => {
  const res = await axiosService.post(apiAuthEndPoint.login, { ...data });
  return res.data;
};

const signup = async (data) => {
  const res = await axiosService.post(apiAuthEndPoint.signup, { ...data });
  return res.data;
};

const logout = async () => {
  const res = await axiosService.get(apiAuthEndPoint.logout);
  return res;
};

const getUser = async () => {
  const res = await axiosService.get(apiAuthEndPoint.getMe);
  if (res.status === 200) return res.data;
  else return null;
};

const googleAuth = async (token) => {
  const res = await axiosService.post(apiAuthEndPoint.googleAuth, { token });
  return res.data;
};

export const authService = {
  login,
  signup,
  logout,
  getUser,
  googleAuth,
};
