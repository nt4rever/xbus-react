import axiosService from "../axiosService";
import { apiAuthEndPoint } from "../constant";

const login = async (data) => {
  const res = await axiosService.post(apiAuthEndPoint.login, { ...data });
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

export const authService = {
  login,
  logout,
  getUser,
};
