export const apiDomain = "https://xbus-nest-production.up.railway.app/";

export const apiAuthEndPoint = {
  login: "auth/signin",
  refresh: "auth/refresh",
};

export const apiRouteEndPoint = {
  getAll: "route",
  getById: "route/",
  update: "route/update/",
  create: "route/create",
  delete: "route/delete/",
};

export const apiStationEndPoint = {
  getByRouteId: "station",
};
