import { axiosService } from "../axiosService";
import { apiAuthEndPoint } from "../constant";

export const logoutAuth = async () => {
  const res = await axiosService.get(apiAuthEndPoint.logout);
  return res;
};
