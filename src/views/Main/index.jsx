import { lazy, Suspense } from "react";
import styles from "./styles.module.scss";
const Map = lazy(() => import("../Map"));
const SideBar = lazy(() => import("../../components/SideBar"));

const Main = () => {
  return (
    <div className={styles["container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <SideBar />
        <Map />
      </Suspense>
    </div>
  );
};

export default Main;
