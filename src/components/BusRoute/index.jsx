import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getListBusRoute } from "../../apis";
import ItemBusRoute from "./ItemBusRoute";
import styles from "./styles.module.scss";

const BusRoute = () => {
  const { data } = useQuery({
    queryKey: ["getRoutes"],
    queryFn: getListBusRoute,
  });

  const listBusRoute = useMemo(
    () => (
      <>
        {data
          ?.sort((a, b) => (a.routeCode < b.routeCode ? -1 : 1))
          .map((item, index) => (
            <ItemBusRoute key={index} busRoute={item} />
          ))}
      </>
    ),
    [data]
  );

  return (
    <div className={styles["bus-route"]}>
      <div className={styles["bus-route__search"]}>
        <input type="text" placeholder="Tìm tuyến xe" />
      </div>
      <div className={styles["bus-route__list--container"]}>{listBusRoute}</div>
    </div>
  );
};

export default BusRoute;
