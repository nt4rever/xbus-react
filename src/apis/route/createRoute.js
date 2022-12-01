import { axiosService } from "../axiosService";
import { apiRouteEndPoint } from "../constant";

export const createRoute = async (values) => {
  const res = await axiosService.post(apiRouteEndPoint.create, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};
