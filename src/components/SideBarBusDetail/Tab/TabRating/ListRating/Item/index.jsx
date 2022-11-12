import styles from "./index.module.scss";
import avatar from "../../../../../../assets/images/avatar.webp";
import { convertTimeFirebase } from "../../../../../../utils/time";
const Item = ({ data }) => {
  const ratingStar = (
    <>
      {Array.from({ length: Math.ceil(data.rating) }).map((_, index) => (
        <span className={styles["star"]} key={index}>
          ★
        </span>
      ))}
      {Array.from({ length: 5 - Math.ceil(data.rating) }).map((_, index) => (
        <span className={`${styles["star"]} ${styles["disable"]}`} key={index}>
          ★
        </span>
      ))}
    </>
  );

  return (
    <div className={styles["rating-item"]}>
      <div className={styles["rating-item__user"]}>
        <div className={styles["user-box"]}>
          <div className={styles["rating-item__user--avatar"]}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles["rating-item__user--info"]}>
            <div className={styles["name"]}>{data.name}</div>
            <div className={styles["time"]}>
              {convertTimeFirebase(data.time)}
            </div>
          </div>
        </div>
        <div className={styles["rating-item__user--rating"]}>{ratingStar}</div>
      </div>
      <div className={styles["rating-item__content"]}>
        <p>{data.text}</p>
      </div>
    </div>
  );
};

export default Item;
