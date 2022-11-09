import styles from "./styles.module.scss";
import logo from "../../../assets/svgs/bus-solid.svg";
import clock from "../../../assets/svgs/clock.svg";
import dollar from "../../../assets/svgs/dollar.svg";
import { useNavigate } from "react-router-dom";

const ItemBusRoute = ({ busRoute }) => {
  const navigate = useNavigate();

  const handleClick = (key) => {
    navigate("/route/" + key);
  };

  return (
    <div className={styles["route"]} onClick={() => handleClick(busRoute.key)}>
      <div className={styles["route__logo"]}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles["route__content"]}>
        <div className={styles["route__content--name"]}>
          {busRoute.routeCode}
        </div>
        <div className={styles["route__content--description"]}>
          {busRoute.routeName}
        </div>
        <div className={styles["route__content--extension"]}>
          <div className={styles["infomation"]}>
            <img
              src={clock}
              className={styles["infomation--icon"]}
              alt="logo"
            />
            <div className={styles["infomation--text"]}>
              {busRoute.operatingTime}
            </div>
          </div>
          <div className={styles["infomation"]}>
            <img
              src={dollar}
              className={styles["infomation--icon"]}
              alt="logo"
            />
            <div className={styles["infomation--text"]}>
              {busRoute.ticketPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBusRoute;
