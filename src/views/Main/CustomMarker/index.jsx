import { useEffect } from "react";
import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ isActive, data }) => {
  const popupRef = useRef(null);
  useEffect(() => {
    if (isActive) popupRef.current?.openPopup();
  }, [isActive]);

  return (
    <Marker position={data.position}>
      <Popup ref={popupRef}>{data.text}</Popup>
    </Marker>
  );
};

export default CustomMarker;
