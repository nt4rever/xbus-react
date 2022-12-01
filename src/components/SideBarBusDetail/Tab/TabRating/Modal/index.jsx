import { message, Modal, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../../store/modal/slice";
import { Input } from "antd";
import styles from "./index.module.scss";
import { useState } from "react";
import { createRating } from "../../../../../apis/rating/createRating";
const { TextArea } = Input;

const NewRating = ({ routeKey }) => {
  const { modalRating } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    rating: 5,
    text: "",
  });

  const handleOk = async () => {
    if (value.text === "")
      return message.error("Vui lòng viết đánh giá của bạn!");
    else {
      setIsLoading(true);
      await createRating({
        ...value,
        routeId: routeKey,
      });
      setValue({ rating: 5, text: "" });
      setIsLoading(false);
      message.success("Thêm đánh giá thành công!");
      dispatch(
        modalActions.setModalRating({
          modalRating: false,
        })
      );
    }
  };

  const handleCancel = () => {
    setValue({ rating: 5, text: "" });
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
      confirmLoading={isLoading}
    >
      <div className={styles["modal__container"]}>
        <div className={styles["modal__rating"]}>
          <Rate value={value.rating} onChange={rateOnChange} />
        </div>
        <TextArea
          showCount
          maxLength={100}
          placeholder="Viết đánh giá của bạn..."
          value={value.text}
          onChange={textOnChange}
        />
      </div>
    </Modal>
  );
};

export default NewRating;
