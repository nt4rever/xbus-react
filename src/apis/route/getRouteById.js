import { axiosService } from "../axiosService";
import { apiRouteEndPoint } from "../constant";

export const getRouteById = async (id) => {
  const res = await axiosService.get(apiRouteEndPoint.getById + id);
  if (res.status === 200) return res.data;
  else return [];
};
