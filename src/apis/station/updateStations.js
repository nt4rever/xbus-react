import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const updateStations = async (values) => {
  const res = await axiosService.post(
    apiStationEndPoint.updateStations,
    values
  );
  if (res.status === 200) return true;
  else return false;
};
