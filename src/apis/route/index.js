import axiosService from "../axiosService";
import { apiRouteEndPoint } from "../constant";

const getList = async () => {
  const res = await axiosService.get(apiRouteEndPoint.getAll);
  if (res.status === 200) return res.data;
  else return [];
};

const getById = async (id) => {
  const res = await axiosService.get(apiRouteEndPoint.getById + id);
  if (res.status === 200) return res.data;
  else return [];
};

const create = async (values) => {
  const res = await axiosService.post(apiRouteEndPoint.create, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};

const update = async ({ id, values }) => {
  const res = await axiosService.post(apiRouteEndPoint.update + id, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};

const destroy = async (id) => {
  const res = await axiosService.post(apiRouteEndPoint.delete + id);
  if (res.status === 200) return true;
  else return false;
};

export const routeService = {
  getList,
  getById,
  update,
  create,
  destroy,
};
