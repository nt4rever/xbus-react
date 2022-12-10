import axios from "axios";

const axiosOrsService = axios.create({
  baseURL: "https://api.openrouteservice.org",
  timeout: 50000,
});

axiosOrsService.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosOrsService;
