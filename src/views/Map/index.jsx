import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { getRouteDirection } from "../../apis/direction/route";
import styles from "./styles.module.scss";
import L from "leaflet";
const RecenterAutomatically = ({ currentStation }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(currentStation);
  }, [currentStation]);
  return null;
};

const iconMarkerForward = L.icon({
  iconUrl: "/location-forward.svg",
  iconSize: [38, 95], // size of the icon

  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const iconMarkerBack = L.icon({
  iconUrl: "/location-back.svg",
  iconSize: [38, 95], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Map = () => {
  const { stations, direction, currentStation, isRoute } = useSelector(
    (state) => state.map
  );

  const { data, isLoading } = useQuery({
    queryKey: ["get-route-direction", stations, direction],
    queryFn: () => getRouteDirection(stations, direction),
    enabled: isRoute,
  });

  const iconMarker =
    direction === "forward" ? iconMarkerForward : iconMarkerBack;

  return (
    <div className={styles["map__container"]}>
      <MapContainer
        center={[15.987076944483714, 108.24177253534327]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations
          .filter((item) => item.direction === direction)
          .map((item, index) => (
            <Marker
              icon={iconMarker}
              position={[item.lat, item.lng]}
              key={index}
            >
              <Tooltip direction="top" offset={[10, -30]} opacity={1} permanent>
                {item.name}
              </Tooltip>
            </Marker>
          ))}
        {currentStation && (
          <RecenterAutomatically currentStation={currentStation} />
        )}
        {!isLoading && data && (
          <GeoJSON
            data={data}
            style={{
              color: "#4fa095",
              weight: 7,
              opacity: 1,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
