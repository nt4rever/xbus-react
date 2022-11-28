import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const getListStation = async (id) => {
  const res = await axiosService.post(apiStationEndPoint.getStations, {
    routeId: id,
  });
  if (res.status === 200) return res.data;
  else return [];
};
