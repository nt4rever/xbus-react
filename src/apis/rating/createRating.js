import { axiosService } from "../axiosService";
import { apiRatingEndPoint } from "../constant";

export const createRating = async (values) => {
  const res = await axiosService.post(apiRatingEndPoint.create, {
    ...values,
  });
  if (res.status === 200) return true;
  return false;
};
