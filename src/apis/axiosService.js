import axios from "axios";
import { apiDomain } from "./constant";

export const axiosService = axios.create({
  baseURL: apiDomain,
  timeout: 10000,
});
