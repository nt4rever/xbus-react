import axiosService from "../axiosService";
import { apiStationEndPoint } from "../constant";

const getList = async (id) => {
  const res = await axiosService.post(apiStationEndPoint.getStations, {
    routeId: id,
  });
  if (res.status === 200) return res.data;
  else return [];
};

const create = async (values) => {
  const res = await axiosService.post(apiStationEndPoint.createStation, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};

const destroy = async (id) => {
  const res = await axiosService.post(apiStationEndPoint.deleteStation + id);
  if (res.status === 200) return true;
  else return false;
};

const update = async (values) => {
  const res = await axiosService.post(apiStationEndPoint.updateStation, {
    ...values,
  });
  if (res.status === 200) return true;
  else return false;
};

const updateList = async (values) => {
  const res = await axiosService.post(
    apiStationEndPoint.updateStations,
    values
  );
  if (res.status === 200) return true;
  else return false;
};

export const stationService = {
  getList,
  create,
  destroy,
  update,
  updateList,
};
