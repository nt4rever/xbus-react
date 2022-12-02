import { axiosService } from "../axiosService";
import { apiRouteEndPoint } from "../constant";

export const updateRoute = async ({ id, values }) => {
  const res = await axiosService.post(apiRouteEndPoint.update + id, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};
