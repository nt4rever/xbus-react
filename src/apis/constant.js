export const apiDomain = "https://xbus-nest-production.up.railway.app/";

export const apiAuthEndPoint = {
  login: "auth/signin",
  refresh: "auth/refresh",
  getMe: "user",
};

export const apiRouteEndPoint = {
  getAll: "route",
  getById: "route/",
  update: "route/update/",
  create: "route/create",
  delete: "route/delete/",
};

export const apiStationEndPoint = {
  getStations: "station",
  updateStation: "station/update",
  createStation: "station/create",
  deleteStation: "station/delete/",
};
