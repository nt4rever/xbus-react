import { axiosService } from "../axiosService";
import { apiAuthEndPoint } from "../constant";

export const loginService = (data) => {
  return axiosService.post(apiAuthEndPoint.login, { ...data });
};
