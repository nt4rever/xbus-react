import { message, Modal, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../../store/modal/slice";
import { Input } from "antd";
import styles from "./index.module.scss";
import { useState } from "react";
import { createRating } from "../../../../../apis/rating";
const { TextArea } = Input;

const NewRating = ({ routeKey }) => {
  const { modalRating } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    rating: 5,
    text: "",
  });

  const handleOk = async () => {
    if (value.text === "")
      return message.error("Vui lòng viết đánh giá của bạn!");
    else {
      await createRating(routeKey, {
        ...value,
        name: `${user.firstName} ${user.lastName}`,
        time: Date.now(),
      });
      dispatch(
        modalActions.setModalRating({
          modalRating: false,
        })
      );
    }
  };
  const handleCancel = () => {
    dispatch(
      modalActions.setModalRating({
        modalRating: false,
      })
    );
  };

  const rateOnChange = (v) => {
    setValue({
      ...value,
      rating: v,
    });
  };
  const textOnChange = (e) => {
    setValue({
      ...value,
      text: e.target.value,
    });
  };
  return (
    <Modal
      title="Đánh giá tuyến xe buýt"
      open={modalRating}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className={styles["modal__container"]}>
        <div className={styles["modal__rating"]}>
          <Rate defaultValue={5} onChange={rateOnChange} />
        </div>

        <TextArea
          showCount
          maxLength={100}
          placeholder="Viết đánh giá của bạn..."
          onChange={textOnChange}
        />
      </div>
    </Modal>
  );
};

export default NewRating;
