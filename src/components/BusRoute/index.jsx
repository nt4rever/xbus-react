import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getListBusRoute } from "../../apis";
import { removeAccents } from "../../utils/string";
import ItemBusRoute from "./ItemBusRoute";
import styles from "./styles.module.scss";

const BusRoute = () => {
  const [seacrchValue, setSeacrchValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["getRoutes"],
    queryFn: getListBusRoute,
  });

  const listBusRoute = useMemo(
    () => (
      <>
        {data
          ?.filter((obj) =>
            Object.values(obj).some((val) =>
              removeAccents(val).includes(removeAccents(seacrchValue))
            )
          )
          .sort((a, b) => (a.routeCode < b.routeCode ? -1 : 1))
          .map((item) => (
            <ItemBusRoute key={item.key} busRoute={item} />
          ))}
      </>
    ),
    [data, seacrchValue]
  );

  const isLoadingEffect = isLoading ? (
    <div className={styles["loader-container"]}>
      <span className={styles["loader"]} />
    </div>
  ) : undefined;

  return (
    <div className={styles["bus-route"]}>
      <div className={styles["bus-route__search"]}>
        <input
          type="text"
          value={seacrchValue}
          onChange={(e) => setSeacrchValue(e.target.value)}
          placeholder="Tìm tuyến xe"
        />
      </div>
      {isLoadingEffect}
      <div className={styles["bus-route__list--container"]}>{listBusRoute}</div>
    </div>
  );
};

export default BusRoute;
