import { axiosService } from "../axiosService";
import { apiAuthEndPoint } from "../constant";

export const refreshLogin = async (token) => {
  const res = await axiosService.get(apiAuthEndPoint.refresh, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
