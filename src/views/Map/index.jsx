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

const RecenterAutomatically = ({ currentStation }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(currentStation);
  }, [currentStation]);
  return null;
};

const Map = () => {
  const { stations, direction, currentStation } = useSelector(
    (state) => state.map
  );

  const { data, isLoading } = useQuery({
    queryKey: ["get-route-direction", stations, direction],
    queryFn: () => getRouteDirection(stations, direction),
  });

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
            <Marker position={[item.lat, item.lng]} key={index}>
              <Tooltip
                direction="top"
                offset={[-15, -15]}
                opacity={1}
                permanent
              >
                {item.name}
              </Tooltip>
            </Marker>
          ))}
        {currentStation && (
          <RecenterAutomatically currentStation={currentStation} />
        )}
        {!isLoading && data && <GeoJSON data={data} />}
      </MapContainer>
    </div>
  );
};

export default Map;
