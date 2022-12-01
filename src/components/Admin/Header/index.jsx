import { UserOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Space } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import logoImg from "./../../../assets/images/avatar.webp";

const Header = () => {
  const items = [
    {
      key: "1",
      label: <Link to={"/"}>XBus page</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      danger: true,
      label: <Link to={"/admin/logout"}>Log out</Link>,
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
                Tan
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
