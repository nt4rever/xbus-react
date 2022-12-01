import { axiosService } from "../axiosService";
import { apiRouteEndPoint } from "../constant";

export const deleteRoute = async (id) => {
  const res = await axiosService.post(apiRouteEndPoint.delete + id);
  if (res.status === 200) return true;
  else return false;
};
