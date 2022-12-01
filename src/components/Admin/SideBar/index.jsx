import { Layout, Menu } from "antd";
import { RocketOutlined, UserOutlined, FundOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  const items = [
    {
      key: "dashboard",
      label: <Link to={"/admin"}>Dashboard</Link>,
      icon: <FundOutlined />,
    },
    {
      key: "route",
      label: <Link to={"/admin/route"}>Route</Link>,
      icon: <RocketOutlined />,
    },
    {
      key: "user",
      label: <Link to={"/admin/user"}>User</Link>,
      icon: <UserOutlined />,
    },
  ];

  const { pathname } = useLocation();
  const currrentPath = pathname.split("/")[2]
    ? pathname.split("/")[2]
    : "dashboard";

  return (
    <Layout.Sider
      collapsible
      collapsedWidth="48px"
      width="208px"
      className={styles["admin-sidebar"]}
      theme="light"
    >
      <Menu
        mode="inline"
        className={styles["admin-sidebar-menu"]}
        defaultSelectedKeys={[currrentPath]}
        style={{
          height: `${document.body.offsetHeight - 96}px`,
        }}
        items={items}
      />
    </Layout.Sider>
  );
};

export default SideBar;
