import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const updateStation = async (values) => {
  const res = await axiosService.post(apiStationEndPoint.updateStation, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};
