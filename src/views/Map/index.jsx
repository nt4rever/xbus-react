import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./styles.module.scss";
const Map = () => {
  const position = [15.987076944483714, 108.24177253534327];

  return (
    <div className={styles["map__container"]}>
      <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
