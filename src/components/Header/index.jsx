import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles["header__logo"]}>
        <h2>XBus</h2>
      </div>
    </header>
  );
};

export default Header;
