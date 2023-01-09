// production
export const apiDomain = "https://xbus-nest-production.up.railway.app/";
// dev
// export const apiDomain = "https://xbus-nest-prod-xbus-x5knol.mo6.mogenius.io/";
// local
// export const apiDomain = "http://localhost:3000/";

export const apiAuthEndPoint = {
  login: "auth/signin",
  signup: "auth/signup",
  refresh: "auth/refresh",
  getMe: "user",
  logout: "auth/logout",
  googleAuth: "google-authentication",
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
  updateStations: "station/updates",
  createStation: "station/create",
  deleteStation: "station/delete/",
};

export const apiRatingEndPoint = {
  ratingById: "rating/",
  statisRatingById: "rating/statis/",
  create: "rating/create",
  delete: "rating/delete",
  deleteByAdmin: "rating/delete/admin",
};

export const apiUserEndPoint = {
  getAll: "auth/users",
  updateByAdmin: "auth/update",
  password: "user/password",
};
