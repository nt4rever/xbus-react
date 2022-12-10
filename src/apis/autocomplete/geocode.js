import axiosOrsService from "../axiosOrsService";

export const getGeocodeAutocomplete = async ({ address }) => {
  const res = await axiosOrsService.get("/geocode/autocomplete", {
    params: {
      api_key: import.meta.env.VITE_ROUTE_KEY,
      text: address,
    },
  });
  return res.data;
};
