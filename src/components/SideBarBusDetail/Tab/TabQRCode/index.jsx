import { useContext } from "react";
import { BusDetailContext } from "../../../../contexts/busDetailContext";
import styles from "./index.module.scss";

const TabQRCode = () => {
  const { routeKey, data } = useContext(BusDetailContext);
  return (
    <div className={styles["qr__panel"]}>
      <div className={styles["qr__panel__title"]}>
        <h3>Mã QR tuyến xe: </h3>
        <p>{data?.routeName}</p>
      </div>
      <div className={styles["qr__panel__image"]}>
        <img
          src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${routeKey}&choe=UTF-8`}
          alt="qr"
        />
      </div>
      <div className={styles["qr__panel__app"]}>
        <p>
          Sử dụng ứng dụng XBus để quét mã. Tải ứng dụng{" "}
          <a
            href="https://xbus-nest-production.up.railway.app/page/xbus"
            target="__blank"
          >
            tại đây
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TabQRCode;
