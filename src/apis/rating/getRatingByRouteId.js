import { axiosService } from "../axiosService";
import { apiRatingEndPoint } from "../constant";

export const getRatingById = async (id, num) => {
  const res = await axiosService.get(apiRatingEndPoint.ratingById + id, {
    params: {
      take: num ? num : 5,
    },
  });
  if (res.status === 200) return res.data;
  return [];
};
