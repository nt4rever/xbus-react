import { lazy, Suspense } from "react";
import Loader from "../../components/Loader";
import styles from "./styles.module.scss";
const Map = lazy(() => import("../Map"));
const SideBar = lazy(() => import("../../components/SideBar"));

const Main = () => {
  return (
    <div className={styles["container"]}>
      <Suspense fallback={<Loader />}>
        <SideBar />
        <Map />
      </Suspense>
    </div>
  );
};

export default Main;
