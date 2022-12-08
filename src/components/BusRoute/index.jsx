import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { removeAccents } from "../../utils/string";
import ItemBusRoute from "./ItemBusRoute";
import useDebounce from "../../hooks/useDebounce";
import styles from "./styles.module.scss";
import { routeService } from "../../apis/route";

const BusRoute = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["getRoutes"],
    queryFn: routeService.getList,
  });

  const listBusRoute = useMemo(() => {
    return (
      <>
        {data
          ?.filter((obj) =>
            Object.values(obj).some(
              (val) =>
                removeAccents(val).includes(removeAccents(searchValue)) &&
                obj.status === "active"
            )
          )
          .sort((a, b) => (a.routeCode < b.routeCode ? -1 : 1))
          .map((item) => (
            <ItemBusRoute key={item.id} busRoute={item} />
          ))}
      </>
    );
  }, [data, debouncedValue]);

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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm tuyến xe"
        />
      </div>
      {isLoadingEffect}
      <div className={styles["bus-route__list--container"]}>{listBusRoute}</div>
    </div>
  );
};

export default BusRoute;
