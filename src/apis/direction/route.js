import axios from "axios";

export const getRouteDirection = (stations, direction) => {
  return new Promise((resolve, reject) => {
    const coordinates = [];
    const stationsParam = stations.filter(
      (item) => item.direction === direction && item.mapDirection === true
    );
    stationsParam.map((item) =>
      coordinates.push([Number(item.lng), Number(item.lat)])
    );
    if (coordinates.length === 0) return resolve(null);
    axios
      .post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates,
        },
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
