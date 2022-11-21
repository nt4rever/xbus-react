import { lazy, Suspense } from "react";
import Loader from "../../components/Loader";
import { BusDetailProvider } from "../../contexts/busDetailContext";
import styles from "./styles.module.scss";
const Map = lazy(() => import("../Map"));

const SideBarBusDetail = lazy(() =>
  import("../../components/SideBarBusDetail")
);

const BusDetail = () => {
  return (
    <div className={styles["container"]}>
      <Suspense fallback={<Loader />}>
        <BusDetailProvider>
          <SideBarBusDetail />
        </BusDetailProvider>
        <Map />
      </Suspense>
    </div>
  );
};

export default BusDetail;
