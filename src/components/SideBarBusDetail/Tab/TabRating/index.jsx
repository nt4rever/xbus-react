import { useQuery } from "@tanstack/react-query";
import { getListRating } from "../../../../apis/rating";
import styles from "./index.module.scss";
import ListRating from "./ListRating";
import SummaryRating from "./SummaryRating";

const TabRating = ({ routeKey }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-list-rating", routeKey],
    queryFn: () => getListRating(routeKey),
  });

  return (
    <div className={styles["rating__container"]}>
      <h2>Tổng hợp đánh giá</h2>
      <div className={styles["rating__summary"]}>
        {isLoading ? "Loading" : <SummaryRating ratings={data} />}
      </div>
      <h2>Các bài đánh giá</h2>
      <div className={styles["rating__list"]}>
        {isLoading ? "Loading" : <ListRating ratings={data} />}
      </div>
    </div>
  );
};

export default TabRating;
