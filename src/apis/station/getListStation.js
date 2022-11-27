import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const getListRoute = async (id) => {
  const res = await axiosService.get(apiStationEndPoint.getByRouteId, {
    routeId: id,
  });
  if (res.status === 200) return res.data;
  else return [];
};
