import axiosService from "../axiosService";
import { apiUserEndPoint } from "../constant";

const getAll = async () => {
  const res = await axiosService.post(apiUserEndPoint.getAll);
  return res.data;
};

const updateByAdmin = async (values) => {
  const res = await axiosService.post(apiUserEndPoint.updateByAdmin, {
    ...values,
  });
  return res.data;
};

const changePassword = async (values) => {
  const res = await axiosService.post(apiUserEndPoint.password, {
    ...values,
  });
  return res.data;
};

export const userService = {
  getAll,
  updateByAdmin,
  changePassword,
};
