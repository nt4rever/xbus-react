import axios from "axios";
import {
  getLocalStorage,
  saveLocalStorage,
  KEY_LOCAL_STORAGE,
} from "../utils/storage";
import { apiAuthEndPoint, apiDomain } from "./constant";

const axiosService = axios.create({
  baseURL: apiDomain,
  timeout: 50000,
});

axiosService.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    if (getLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN)) {
      config.headers["Authorization"] = `Bearer ${getLocalStorage(
        KEY_LOCAL_STORAGE.ACCESS_TOKEN
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== apiAuthEndPoint.login && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshToken = getLocalStorage(KEY_LOCAL_STORAGE.REFRESH_TOKEN);
          const res = await axios.get(apiDomain + apiAuthEndPoint.refresh, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          const { access_token, refresh_token } = res.data;
          saveLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN, access_token);
          saveLocalStorage(KEY_LOCAL_STORAGE.REFRESH_TOKEN, refresh_token);
          return axiosService(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosService;
