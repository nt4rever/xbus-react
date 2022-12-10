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
import { iconCurrentLocation, iconMarkerBack, iconMarkerForward } from "./Icon";
import { AimOutlined } from "@ant-design/icons";
import { useState } from "react";

function CustomLocation({ currentStation }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  const locationHandleClick = () => {
    map.locate().addEventListener("locationfound", (e) => {
      setPosition(e.latlng);
      map.setView(e.latlng);
    });
  };

  useEffect(() => {
    if (currentStation !== undefined) map.setView(currentStation);
  }, [currentStation]);

  return (
    <>
      {position === null ? null : (
        <Marker icon={iconCurrentLocation} position={position}></Marker>
      )}
      <div className={styles.map__location} onClick={locationHandleClick}>
        <AimOutlined />
      </div>
    </>
  );
}

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

  const listStationMarker = stations
    .filter((item) => item.direction === direction)
    .map((item, index) => (
      <Marker icon={iconMarker} position={[item.lat, item.lng]} key={index}>
        <Tooltip direction="top" offset={[10, -30]} opacity={1} permanent>
          {item.name}
        </Tooltip>
      </Marker>
    ));

  const colorGeo = direction === "forward" ? "#4fa095" : "#59C1BD";

  const geoJson =
    !isLoading && data ? (
      <GeoJSON
        data={data}
        style={{
          color: `${colorGeo}`,
          weight: 7,
          opacity: 1,
        }}
      />
    ) : undefined;

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

        {listStationMarker}
        {geoJson}
        <CustomLocation currentStation={currentStation} />
      </MapContainer>
    </div>
  );
};

export default Map;
