import { axiosService } from "../axiosService";
import { apiRatingEndPoint } from "../constant";

export const getStatisRatingById = async (id) => {
  const res = await axiosService.get(
    apiRatingEndPoint.statisRatingById + id,
    {}
  );
  if (res.status === 200) return res.data;
  return [];
};
