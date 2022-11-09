import { lazy, Suspense } from "react";
import styles from "./styles.module.scss";
const Map = lazy(() => import("../Map"));

const SideBarBusDetail = lazy(() =>
  import("../../components/SideBarBusDetail")
);

const BusDetail = () => {
  return (
    <div className={styles["container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <SideBarBusDetail />
        <Map />
      </Suspense>
    </div>
  );
};

export default BusDetail;
