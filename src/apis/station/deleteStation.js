import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const deleteStation = async (id) => {
  const res = await axiosService.post(apiStationEndPoint.deleteStation + id);
  if (res.status === 200) return true;
  else return false;
};
