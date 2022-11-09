import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles["header__logo"]}>
        <Link to={"/"}>
          <h2>XBus</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
