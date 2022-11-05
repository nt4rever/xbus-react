import SideBar from "../../components/SideBar";
import Map from "../Map";
import styles from "./styles.module.scss";

const Main = () => {
  return (
    <div className={styles["container"]}>
      <SideBar />
      <Map />
    </div>
  );
};

export default Main;
