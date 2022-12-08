import { Spin } from "antd";
import styles from "./index.module.scss";

const LoadingFullPage = () => {
  return (
    <div className={styles.root}>
      <Spin />
    </div>
  );
};

export default LoadingFullPage;
