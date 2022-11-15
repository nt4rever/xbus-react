import { message, Modal, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../../store/modal/slice";
import { Input } from "antd";
import styles from "./index.module.scss";
import { useState } from "react";
const { TextArea } = Input;

const NewRating = () => {
  const { modalRating } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    rating: 5,
    text: "",
  });

  const handleOk = () => {
    if (value.text === "")
      return message.error("Vui lòng viết đánh giá của bạn!");
    dispatch(
      modalActions.setModalRating({
        modalRating: false,
      })
    );
  };
  const handleCancel = () => {
    dispatch(
      modalActions.setModalRating({
        modalRating: false,
      })
    );
  };

  const rateOnChange = (value) => {
    setValue({
      ...value,
      rating: value,
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
