import { lazy, Suspense, useContext } from "react";
import styles from "./index.module.scss";
import Loader from "../../../components/Loader";
import { Button } from "antd";
import { RouteAdminContext } from "../../../contexts/routeAdminContext";
import NewRoute from "./NewRoute";
import RouteStation from "./Station";
const RouteDetail = lazy(() => import("./Detail"));
const RouteTable = lazy(() => import("./Table"));

const RouteMange = () => {
  const { newHandle } = useContext(RouteAdminContext);

  return (
    <div className={styles["route__content"]}>
      <Suspense fallback={<Loader />}>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => newHandle()}
        >
          New route
        </Button>
        <RouteTable />
        <RouteDetail />
        <NewRoute />
        <RouteStation />
      </Suspense>
    </div>
  );
};

export default RouteMange;
