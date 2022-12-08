import axiosService from "../axiosService";
import { apiRatingEndPoint } from "../constant";

const create = async (values) => {
  const res = await axiosService.post(apiRatingEndPoint.create, {
    ...values,
  });
  if (res.status === 200) return true;
  return false;
};

const deleteByUser = async (id) => {
  const res = await axiosService.post(apiRatingEndPoint.delete, {
    ratingId: id,
  });
  if (res.status === 200) return true;
  return false;
};

const deleteByAdmin = async (id) => {
  const res = await axiosService.post(apiRatingEndPoint.deleteByAdmin, {
    ratingId: id,
  });
  if (res.status === 200) return true;
  return false;
};

const getById = async (id, num) => {
  const res = await axiosService.get(apiRatingEndPoint.ratingById + id, {
    params: {
      take: num ? num : 5,
    },
  });
  if (res.status === 200) return res.data;
  return [];
};

const getStatisById = async (id) => {
  const res = await axiosService.get(apiRatingEndPoint.statisRatingById + id);
  if (res.status === 200) return res.data;
  return [];
};

export const ratingService = {
  create,
  deleteByUser,
  deleteByAdmin,
  getById,
  getStatisById,
};
