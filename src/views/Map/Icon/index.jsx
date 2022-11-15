import L from "leaflet";

export const iconMarkerForward = L.icon({
  iconUrl: "/location-forward.svg",
  iconSize: [38, 95], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export const iconMarkerBack = L.icon({
  iconUrl: "/location-back.svg",
  iconSize: [38, 95], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
