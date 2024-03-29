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
import {
  iconBus,
  iconCurrentLocation,
  iconMarkerBack,
  iconMarkerForward,
} from "./Icon";
import { AimOutlined } from "@ant-design/icons";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../apis/firebase";
import { convertTimeShort } from "../../utils/time";

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
  const [trackings, setTrackings] = useState([]);
  const { stations, direction, currentStation, isRoute, routeId } = useSelector(
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

  const listTrackingMaker = trackings
    .filter((item) => item.status === "true")
    .map((item, index) => (
      <Marker
        icon={iconBus}
        position={[Number(item.lat), Number(item.lng)]}
        key={index}
      >
        <Tooltip direction="top" offset={[10, -30]} opacity={1} permanent>
          {`${item.busCode} (${convertTimeShort(Number(item.time))})`}
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

  useEffect(() => {
    if (isRoute && routeId) {
      const query = ref(db, `Tracking/${routeId}`);
      const unsubscribe = onValue(query, (snapshot) => {
        setTrackings([]);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          setTrackings(data);
        }
      });
      return () => {
        unsubscribe();
        console.log("Unsubscribe firebase!");
      };
    }
  }, [isRoute, routeId]);

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
        {listTrackingMaker}
        {geoJson}
        <CustomLocation currentStation={currentStation} />
      </MapContainer>
    </div>
  );
};

export default Map;
