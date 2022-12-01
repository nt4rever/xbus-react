import styles from "./index.module.scss";
import avatar from "../../../../../../assets/images/avatar.webp";
import { convertTime } from "../../../../../../utils/time";
import { Button, Popconfirm } from "antd";
const Item = ({ data, isOwn, handleDeleteRating }) => {
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
            <div className={styles["time"]}>{convertTime(data.time)}</div>
          </div>
        </div>
        <div className={styles["rating-item__user--rating"]}>
          {ratingStar}{" "}
          {isOwn && (
            <div className={styles["rating-item__action"]}>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDeleteRating(data.id)}
              >
                <Button size="small">Xoa</Button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
      <div className={styles["rating-item__content"]}>
        <p>{data.text}</p>
      </div>
    </div>
  );
};

export default Item;
