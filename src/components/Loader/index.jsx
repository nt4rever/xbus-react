import styles from "./index.module.scss";
const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <span className={styles["loader"]} />
    </div>
  );
};

export default Loader;
