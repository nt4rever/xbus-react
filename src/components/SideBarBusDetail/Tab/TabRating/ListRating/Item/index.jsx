import styles from "./index.module.scss";
import avatar from "../../../../../../assets/images/avatar.webp";

const Item = ({ data }) => {
  return (
    <div className={styles["rating-item"]}>
      <div className={styles["rating-item__user"]}>
        <div className={styles["user-box"]}>
          <div className={styles["rating-item__user--avatar"]}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles["rating-item__user--info"]}>
            <div className={styles["name"]}>{data.name}</div>
            <div className={styles["time"]}>{data.time}</div>
          </div>
        </div>
        <div className={styles["rating-item__user--rating"]}>
          <span className={styles["star"]}>★ </span>
          <span className={styles["star"]}>★ </span>
          <span className={styles["star"]}>★ </span>
          <span className={styles["star"]}>★ </span>
          <span className={`${styles["star"]} ${styles["disable"]}`}>★ </span>
        </div>
      </div>
      <div className={styles["rating-item__content"]}>
        <p>{data.text}</p>
      </div>
    </div>
  );
};

export default Item;
