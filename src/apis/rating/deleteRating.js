import { axiosService } from "../axiosService";
import { apiRatingEndPoint } from "../constant";

export const deleteRating = async (id) => {
  const res = await axiosService.post(apiRatingEndPoint.delete, {
    ratingId: id,
  });
  if (res.status === 200) return true;
  return false;
};

export const deleteRatingByAdmin = async (id) => {
  const res = await axiosService.post(apiRatingEndPoint.deleteByAdmin, {
    ratingId: id,
  });
  if (res.status === 200) return true;
  return false;
};
