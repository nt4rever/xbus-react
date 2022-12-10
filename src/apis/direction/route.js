import axiosOrsService from "../axiosOrsService";

export const getRouteDirection = (stations, direction) => {
  return new Promise((resolve, reject) => {
    const coordinates = [];
    const stationsParam = stations
      .filter(
        (item) => item.direction === direction && item.mapDirection === true
      )
      .sort((a, b) => a.order - b.order);
    stationsParam.map((item) => coordinates.push([item.lng, item.lat]));
    if (coordinates.length === 0) return resolve(null);
    axiosOrsService
      .post(
        "/v2/directions/driving-car/geojson",
        { coordinates },
        {
          headers: {
            Authorization: import.meta.env.VITE_ROUTE_KEY,
          },
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
