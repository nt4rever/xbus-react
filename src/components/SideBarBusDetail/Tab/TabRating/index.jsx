import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingById } from "../../../../apis/rating/getRatingByRouteId";
import { getStatisRatingById } from "../../../../apis/rating/getStatisByRouteId";
import { BusDetailContext } from "../../../../contexts/busDetailContext";
import { modalActions } from "../../../../store/modal/slice";
import styles from "./index.module.scss";
import ListRating from "./ListRating";
import NewRating from "./Modal";
import SummaryRating from "./SummaryRating";

const TabRating = () => {
  const { routeKey, currentList, setTotal } = useContext(BusDetailContext);
  const { isLogged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["get-list-rating", routeKey, currentList],
    queryFn: () => getRatingById(routeKey, currentList),
    keepPreviousData: true,
  });

  const { data: statis, isLoading: statisLoading } = useQuery({
    queryKey: ["get-statis-rating", routeKey],
    queryFn: () => getStatisRatingById(routeKey),
    onSuccess: (data) => {
      setTotal(data.total);
    },
  });

  const buttonRatingClick = () => {
    if (isLogged)
      dispatch(
        modalActions.setModalRating({
          modalRating: true,
        })
      );
    else
      dispatch(
        modalActions.setModalLogin({
          modalLogin: true,
        })
      );
  };

  return (
    <div className={styles["rating__container"]}>
      <div className={styles["rating__button"]}>
        <button onClick={buttonRatingClick}>Viết đánh giá</button>
        <NewRating routeKey={routeKey} />
      </div>
      <h2>Tổng hợp đánh giá</h2>
      <div className={styles["rating__summary"]}>
        {statisLoading ? "Loading" : <SummaryRating statis={statis} />}
      </div>
      <h2>Các bài đánh giá</h2>
      <div className={styles["rating__list"]}>
        {isLoading ? (
          "Loading"
        ) : (
          <ListRating ratings={data} userId={user?.id} />
        )}
      </div>
    </div>
  );
};

export default TabRating;
