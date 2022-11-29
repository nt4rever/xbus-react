import { axiosService } from "../axiosService";
import { apiAuthEndPoint } from "../constant";

export const getUser = async () => {
  const res = await axiosService.get(apiAuthEndPoint.getMe);
  if (res.status === 200) return res.data;
  else return null;
};
