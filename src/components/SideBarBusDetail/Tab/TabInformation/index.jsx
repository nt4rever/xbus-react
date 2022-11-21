import { useContext } from "react";
import { BusDetailContext } from "../../../../contexts/busDetailContext";
import styles from "./index.module.scss";

const TabInformation = () => {
  const { data } = useContext(BusDetailContext);
  return (
    <div className={styles["information"]}>
      {data && (
        <ul>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Tên tuyến:</div>
            <div className={styles["content"]}>{data.routeName}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Thời gian hoạt động:</div>
            <div className={styles["content"]}>{data.operatingTime}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Độ dài tuyến:</div>
            <div className={styles["content"]}>{data.routeLength}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Giãn cách tuyến:</div>
            <div className={styles["content"]}>{data.betweenTwoBus}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Số chuyến:</div>
            <div className={styles["content"]}>{data.numberOfTrips}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Giá vé:</div>
            <div className={styles["content"]}>{data.ticketPrice}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Lượt đi:</div>
            <div className={styles["content"]}>{data.forwardTrip}</div>
          </li>
          <li className={styles["row"]}>
            <div className={styles["title"]}>Lượt về:</div>
            <div className={styles["content"]}>{data.backwardTrip}</div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TabInformation;
