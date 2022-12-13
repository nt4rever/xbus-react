import { PlayCircleOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map/slice";
import SearchAutocomplete from "../SearchAutocomplete";
import styles from "./index.module.scss";

const Navigate = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChooseLocation = (value) => {
    setData({ ...data, ...value });
  };

  const onNavigate = () => {
    setLoading(true);
    if (data?.depart && data?.destination) {
      const stations = [
        {
          name: data.depart.label,
          lng: data.depart.coordinates[0],
          lat: data.depart.coordinates[1],
          direction: "forward",
          mapDirection: true,
        },
        {
          name: data.destination.label,
          lng: data.destination.coordinates[0],
          lat: data.destination.coordinates[1],
          direction: "forward",
          mapDirection: true,
        },
      ];

      dispatch(
        mapActions.setStations({
          stations,
          isRoute: true,
          direction: "forward",
          currentStation: [
            data.depart.coordinates[1],
            data.depart.coordinates[0],
          ],
        })
      );
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className={styles.root}>
      <div className={styles.searchBox}>
        <SearchAutocomplete
          inputName="depart"
          onChooseLocation={onChooseLocation}
          icon={<PlayCircleOutlined />}
          placeholder="Nơi bắt đầu..."
        />
        <div className={styles.divider}></div>
        <SearchAutocomplete
          inputName="destination"
          onChooseLocation={onChooseLocation}
          icon={<CheckOutlined />}
          placeholder="Điểm đến..."
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="primary" loading={loading} onClick={onNavigate}>
          Tìm đường
        </Button>
      </div>
    </div>
  );
};

export default Navigate;
