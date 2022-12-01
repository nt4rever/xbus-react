import { axiosService } from "../axiosService";
import { apiRouteEndPoint } from "../constant";

export const getListRoute = async () => {
  const res = await axiosService.get(apiRouteEndPoint.getAll);
  if (res.status === 200) return res.data;
  else return [];
};
