import { lazy, Suspense } from "react";
import Loader from "../../../components/Loader";
import styles from "./index.module.scss";

const TableUser = lazy(() => import("./../../../components/Admin/User/Table"));

const UserMange = () => {
  return (
    <div className={styles.root}>
      <Suspense fallback={<Loader />}>
        <TableUser />
      </Suspense>
    </div>
  );
};

export default UserMange;
