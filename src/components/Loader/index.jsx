import styles from "./index.module.scss";
const Loader = ({ height }) => {
  return (
    <div className={styles["loader-container"]} style={{ height: height }}>
      <span className={styles["loader"]} />
    </div>
  );
};

export default Loader;
