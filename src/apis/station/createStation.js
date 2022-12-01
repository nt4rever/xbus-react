import { axiosService } from "../axiosService";
import { apiStationEndPoint } from "../constant";

export const createStation = async (values) => {
  const res = await axiosService.post(apiStationEndPoint.createStation, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};
