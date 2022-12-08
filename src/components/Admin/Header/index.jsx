import { UserOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Space } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import logoImg from "./../../../assets/images/avatar.webp";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/slice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    try {
      dispatch(authActions.logout());
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      key: "1",
      label: <Link to={"/"}>XBus page</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      danger: true,
      label: <div onClick={handleLogoutClick}>Log out</div>,
      icon: <LoginOutlined />,
    },
  ];
  return (
    <Layout.Header className={styles["admin-header"]}>
      <div className={styles["admin-header-logo"]}>
        <Link to={"/admin"}>
          <img src={logoImg} alt="logo"></img>
          <span>Xbus Admin</span>
        </Link>
      </div>
      <div className={styles["admin-header-nav"]}>
        <div className={styles["admin-header-right"]}>
          <Dropdown
            menu={{
              items,
            }}
          >
            <span className={styles["header-user"]}>
              <Space>
                <UserOutlined />
                {user?.lastName}
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
