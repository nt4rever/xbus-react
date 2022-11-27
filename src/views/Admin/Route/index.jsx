import { lazy, Suspense } from "react";
import styles from "./index.module.scss";
import Loader from "../../../components/Loader";
const RouteDetail = lazy(() => import("./Detail"));
const RouteTable = lazy(() => import("./Table"));

const RouteMange = () => {
  return (
    <div className={styles["route__content"]}>
      <Suspense fallback={<Loader />}>
        <RouteTable />
        <RouteDetail />
      </Suspense>
    </div>
  );
};

export default RouteMange;
