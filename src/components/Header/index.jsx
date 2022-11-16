import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth/slice";
import { modalActions } from "../../store/modal/slice";
import LoginModal from "./Modal";
import styles from "./styles.module.scss";

const Header = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    dispatch(
      modalActions.setModalLogin({
        modalLogin: true,
      })
    );
  };

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  return (
    <header>
      <div className={styles["header__logo"]}>
        <Link to={"/"}>
          <h2>XBus</h2>
        </Link>
      </div>
      <div className={styles["header__auth"]}>
        {isLogged ? (
          <div className={styles["header__auth__user"]}>
            <div className={styles["logout"]} onClick={handleLogoutClick}>
              Logout
            </div>
            <span>{user.username}</span>
          </div>
        ) : (
          <button onClick={handleLoginClick}>Đăng nhập</button>
        )}
      </div>
      <LoginModal />
    </header>
  );
};

export default Header;
