import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../components/Admin/Header";
import SideBar from "../../components/Admin/SideBar";
import styles from "./index.module.scss";

const AdminLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Layout.Content className={styles["admin-content"]}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
