import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAuth } from "../../apis/auth/logout";
import { authActions } from "../../store/auth/slice";
import { modalActions } from "../../store/modal/slice";
import LoginModal from "./Modal";
import styles from "./styles.module.scss";

const Header = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    dispatch(
      modalActions.setModalLogin({
        modalLogin: true,
      })
    );
  };

  const handleLogoutClick = async () => {
    try {
      await logoutAuth();
      dispatch(authActions.logout());
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavAdminClick = () => {
    navigate("/admin");
  };

  const adminNav = () => {
    if (user?.roles.some((x) => x === "admin"))
      return (
        <div className={styles["item"]} onClick={handleNavAdminClick}>
          Admin
        </div>
      );
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
            <div className={styles["submenu"]}>
              {React.createElement(adminNav)}
              <div onClick={handleLogoutClick} className={styles["item"]}>
                Logout
              </div>
            </div>
            <span>{`${user.firstName} ${user.lastName}`}</span>
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
